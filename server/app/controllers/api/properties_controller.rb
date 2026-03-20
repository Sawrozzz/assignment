module Api
    class PropertiesController < ApplicationController
        before_action :authorize_request

        def index
            @properties = Property.all
            render json: @properties, status: :ok
        end

        def show
            @property = Property.find(params[:id])
            render json: @property, status: :ok unless @property
            render json: { error: "Property not found" }, status: :not_found
        end
    end
end
