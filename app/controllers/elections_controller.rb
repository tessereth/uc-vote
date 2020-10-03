class ElectionsController < ApplicationController
  def primary
    @election = Election.where(primary: true).first
  end

  def show
    @election = Election.find_by!(slug: params[:id])
  end
end
