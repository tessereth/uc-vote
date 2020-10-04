require 'rails_helper'

RSpec.describe 'Elections', type: :request do
  describe 'GET primary' do
    let!(:other_election) { create :election, name: 'Foo', visibility: :public }
    context 'when public' do
      let!(:election) { create :election, name: 'Awesome Election', visibility: :public, primary: true }

      it 'returns the election' do
        get primary_elections_path(format: :json)
        expect(response).to have_http_status(:ok)
        expect(response.parsed_body).to eq('id' => election.id, 'slug' => election.slug)
      end
    end

    context 'when private' do
      let!(:election) { create :election, name: 'Awesome Election', visibility: :private, primary: true }

      it 'returns 404' do
        get primary_elections_path(format: :json)
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe 'GET election' do
    context 'when public' do
      let!(:election) { create :election, name: 'Awesome Election', visibility: :public }

      it 'returns the election' do
        get election_path(id: election.slug, format: :json)
        expect(response).to have_http_status(:ok)
        expect(response.parsed_body).to include('name' => 'Awesome Election')
      end
    end

    context 'when private' do
      let!(:election) { create :election, visibility: :private }

      it 'returns 404' do
        get election_path(id: election.slug, format: :json)
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
