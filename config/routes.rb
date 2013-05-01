AJAXRailsTodo::Application.routes.draw do
  resources :todos

  root :to => 'todos#new'

end
