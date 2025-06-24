Conectar Banco de Dados
	Baixar o postgress 14 no Windows
	Instalar extensão no visual studio
	Ir em database no menu mais a direita
	criar base de dados
		i.   logar com conta do pc criada na instalação, abrir terminal e rodar:
			CREATE USER admin WITH PASSWORD 'password';
			ALTER USER admin WITH SUPERUSER;
			DROP DATABASE IF EXISTS vagamiga;
			CREATE DATABASE vagamiga OWNER admin;
		ii.  voltar ao menu e logar com o admin criado na database vagamiga
		iii. abrir terminal da database vagamiga para criar as tabelas
			-> arquivo de querys



Rodar o Código
	Baixar o node
	Baixar o Yarn
	Dentro do projeto no visual studio criar dois terminais utilizando comandos BASH (canto superior direito do terminal para alterar)
	Terminal 1:
		cd vagamiga/
		cd frontend/
		yarn install
		yarn start

	Terminal 2: 
		cd vagamiga/	
		python -m venv venv
		source venv/Scripts/activate
		pip install django
		pip install djangorestframework
		pip install django-cors-headers
		pip install psycopg2-binary
		pip install djangorestframework-simplejwt
		python manage.py makemigrations api
		python manage.py migrate
		make run-backend



setings.py deve ter os seguintes dados:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'vagamiga',
            'USER': 'admin',
            'PASSWORD': 'password',
            'HOST': 'localhost',
            'PORT': '5432',
        }
    }


