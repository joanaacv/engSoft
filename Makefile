

# run backend

# source venv/bin/activate
# cd backend
# python manage.py runserver

run-backend:
	@echo "Running backend..."
	@source venv/bin/activate && cd backend &&python manage.py runserver
	@echo "Backend is running."