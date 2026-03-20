class ApplicationController < ActionController::API
    include JwtAuth

    def authorize_request
        header = request.headers["Authorization"]

        token = header.split(" ").last if header

        decoded = decode_token(token)

        if decoded
            @current_user = User.find(decoded[:user_id])
        else
            render json: { error: "Not Authorized" }, status: :unauthorized
        end
    rescue ActiveRecord::RecordNotFound
        render json: { error: "User Not Found" }, status: :unauthorized
    end
end
