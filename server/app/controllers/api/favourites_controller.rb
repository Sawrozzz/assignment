module Api
    class FavouritesController < ApplicationController
      before_action :authorize_request

      def index
        favourites = @current_user.favourites.includes(:property)

        render json: favourites.as_json(include: :property), status: :ok
      end

      def create
        existing = @current_user.favourites.find_by(property_id: params[:property_id])

        if existing
          render json: { message: "Already in favourites" }, status: :ok
        else
          favourite = @current_user.favourites.new(property_id: params[:property_id])
          if favourite.save
            render json: favourite.as_json(include: :property), status: :created
          else
            render json: { errors: favourite.errors.full_messages }, status: :unprocessable_entity
          end
        end
      end

      def destroy
        favourite = @current_user.favourites.find_by(id: params[:id])

        if favourite
          favourite.destroy
          render json: { message: "Removed from favourites" }, status: :ok
        else
          render json: { error: "Property not found" }, status: :not_found
        end
      end

      def toggle_like
        favourite = @current_user.favourites.find_by(id: params[:id])

        if favourite.toggle_like!
          render json: favourite, status: :ok
        else
          render json: { errors: "Unable to toggle like" }, status: :unprocessable_entity
        end
      end
    end
end
