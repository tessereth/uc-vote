require 'rails_helper'

RSpec.describe 'Votes', type: :request do
  describe 'GET new' do
    context 'when election is public' do
      let!(:election) { create :election, visibility: :public }

      context 'when token is new' do
        let!(:token) { create :vote_token, election: election, state: 'new' }

        it 'returns the election' do
          get new_election_vote_path(election_id: election.slug, token: token.token, format: :json)
          expect(response).to have_http_status(:ok)
          expect(response.parsed_body).to include('name' => election.name)
        end
      end

      context 'when token is used' do
        let!(:token) { create :vote_token, election: election, state: 'used' }

        it 'returns a useful error message' do
          get new_election_vote_path(election_id: election.slug, token: token.token, format: :json)
          expect(response).to have_http_status(:bad_request)
          expect(response.parsed_body).to include('error' => include('used'))
        end
      end

      context 'when token is revoked' do
        let!(:token) { create :vote_token, election: election, state: 'revoked' }

        it 'returns a useful error message' do
          get new_election_vote_path(election_id: election.slug, token: token.token, format: :json)
          expect(response).to have_http_status(:bad_request)
          expect(response.parsed_body).to include('error' => include('revoked'))
        end
      end

      context 'with invalid token' do
        it 'returns a useful error message' do
          get new_election_vote_path(election_id: election.slug, token: 'whatever', format: :json)
          expect(response).to have_http_status(:bad_request)
          expect(response.parsed_body).to include('error' => include('Unknown voting code'))
        end
      end

      context 'with no token' do
        it 'returns a useful error message' do
          get new_election_vote_path(election_id: election.slug, format: :json)
          expect(response).to have_http_status(:bad_request)
          expect(response.parsed_body).to include('error' => include('Unknown voting code'))
        end
      end

      context 'with token for a different election' do
        let!(:other_election) { create :election, visibility: :public, state: :open }
        let!(:token) { create :vote_token, election: other_election, state: 'new' }

        it 'returns a useful error message' do
          get new_election_vote_path(election_id: election.slug, token: token.token, format: :json)
          expect(response).to have_http_status(:bad_request)
          expect(response.parsed_body).to include('error' => include('Unknown voting code'))
        end
      end
    end

    context 'when election is private' do
      let!(:election) { create :election, visibility: :private }
      let!(:token) { create :vote_token, election: election, state: 'new' }

      it 'returns 404' do
        get new_election_vote_path(election_id: election.slug, token: token.token, format: :json)
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe 'POST create' do
    context 'when election is public and open' do
      let!(:election) { create :election, visibility: :public, state: :open }

      context 'when token is new' do
        let!(:token) { create :vote_token, election: election, state: 'new' }
        let!(:position1) { create :position, election: election }
        let!(:position2) { create :position, election: election }
        let!(:candidate1) { create :candidate, position: position1 }
        let!(:candidate2) { create :candidate, position: position1 }
        let!(:candidate3) { create :candidate, position: position2 }
        let!(:candidate4) { create :candidate, position: position2 }

        it 'records the correct vote' do
          post election_votes_path(
                 election_id: election.slug,
                 token: token.token,
                 vote: { candidate1.id => true, candidate2.id => false, candidate3.id => false },
                 format: :json)
          expect(response).to have_http_status(:ok)
          expect(response.parsed_body).to include('id')
          vote = Vote.find(response.parsed_body['id'])
          expect(vote.candidate_votes.length).to eq(4)
          expect(vote.candidate_votes.where(block_vote: true).pluck(:candidate_id)).to eq([candidate1.id])
        end
      end

      context 'when token is used' do
        let!(:token) { create :vote_token, election: election, state: 'used' }

        it 'returns a useful error message' do
          post election_votes_path(election_id: election.slug, token: token.token, format: :json)
          expect(response).to have_http_status(:bad_request)
          expect(response.parsed_body).to include('error' => include('used'))
        end
      end

      context 'when token is revoked' do
        let!(:token) { create :vote_token, election: election, state: 'revoked' }

        it 'returns a useful error message' do
          post election_votes_path(election_id: election.slug, token: token.token, format: :json)
          expect(response).to have_http_status(:bad_request)
          expect(response.parsed_body).to include('error' => include('revoked'))
        end
      end

      context 'with token for a different election' do
        let!(:other_election) { create :election, visibility: :public, state: :open }
        let!(:token) { create :vote_token, election: other_election, state: 'new' }

        it 'returns a useful error message' do
          post election_votes_path(election_id: election.slug, token: token.token, format: :json)
          expect(response).to have_http_status(:bad_request)
          expect(response.parsed_body).to include('error' => include('Unknown voting code'))
        end
      end
    end

    context 'when election is closed' do
      let!(:election) { create :election, visibility: :public, state: :closed }
      let!(:token) { create :vote_token, election: election, state: 'new' }

      it 'returns a useful error message' do
        post election_votes_path(election_id: election.slug, token: token.token, format: :json)
        expect(response).to have_http_status(:bad_request)
        expect(response.parsed_body).to include('error' => include('not currently open'))
      end
    end

    context 'when election is private' do
      let!(:election) { create :election, visibility: :private }
      let!(:token) { create :vote_token, election: election, state: 'new' }

      it 'returns 404' do
        post election_votes_path(election_id: election.slug, token: token.token, format: :json)
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
