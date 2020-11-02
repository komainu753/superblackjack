Rails.application.routes.draw do
  get '/' => "home#top"
  get 'signup' => "users#top"
  post 'users/create' => "users#create"
  get 'login' => "users#login"
  post "login" => "users#logindb"
  get 'myPage' => "users#myPage"
  get 'rank/top' => "rank#top"
  get 'game/gest' => "game#gest"
  get "game/:id" => "game#user"
  post "game/money" => "game#money"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
