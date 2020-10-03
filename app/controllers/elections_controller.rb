class ElectionsController < ApplicationController
  def primary
    @election = Election.visibility_public.find_by!(primary: true)
  end

  def show
    @election = Election.visibility_public.find_by!(slug: params[:id])
  end
end
