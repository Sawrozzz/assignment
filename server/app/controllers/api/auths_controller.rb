module Api
    class AuthsController < ApplicationController
        include JwtAuth
        before_action :authorize_request, only: [ :logout ]

        def signup
            user = User.new(user_params)
            if user.save
                token = encode_token(user_id: user.id)
                render json: { user: user_data(user), token: token }, status: :created
            else
                render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
            end
        end

        def login
            user = User.find_by(email: params[:email])
            if user&.authenticate(params[:password])
              token = encode_token(user_id: user.id)
              render json: { user: user_data(user), token: token }, status: :ok
            else
              render json: { error: "Invalid email or password" }, status: :unauthorized
            end
        end

        def logout
            render json: { message: "Logged Out Successfully" }, status: :ok
        end

        private

        def user_params
            params.permit(:name, :email, :password, :role)
        end

        def user_data(user)
            {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        end
    end
end
