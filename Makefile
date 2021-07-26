.SILENT:
.PHONY: help start stop logs test create_db drop_db migration_status migration migration_undo migration_undo_all seed_all seed_undo seed_undo_all client api

ENV ?= dev
DC   = docker-compose -f docker-compose.$(ENV).yml

COM_COLOR	= \033[0;34m
OBJ_COLOR	= \033[0;36m
OK_COLOR	= \033[0;32m
ERROR_COLOR	= \033[0;31m
WARN_COLOR	= \033[0;33m
NO_COLOR	= \033[m

help: 
	@awk 'BEGIN {FS = ":.*##"; printf "Usage: make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)


##@ Docker
build: ## build Docker containers 
	$(DC) build

start: ## Launch Docker containers 
	$(DC) up -d

stop: ## Down Docker containers 
	$(DC) down

logs: ## Show logs
	$(DC) logs $(filter-out $@,$(MAKECMDGOALS))


test: ## Exec test
	echo "$(OK_COLOR)Exec test$(NO_COLOR)"
	$(DC) exec -T api-dev npm run test

api: ## Exec container api
	$(DC) exec api-dev $(filter-out $@,$(MAKECMDGOALS))

##@ Database
create_db: ## Create database
	echo "$(OK_COLOR)Create database$(NO_COLOR)"
	$(DC) exec api-dev npx sequelize-cli db:create

drop_db: ## Drop database
	echo "$(WARN_COLOR)Drop database$(NO_COLOR)"
	$(DC) exec api-dev npx sequelize-cli db:drop

migration_status: ## List the status of all migrations
	echo "$(OK_COLOR)List the status of all migrations$(NO_COLOR)"
	$(DC) exec api-dev npx sequelize-cli db:migrate:status

migration: ## Launch migrations up
	echo "$(OK_COLOR)Up migrations$(NO_COLOR)"
	$(DC) exec -T api-dev npx sequelize-cli db:migrate

migration_undo: ## Reverts a migration
	echo "$(OK_COLOR)Reverts a migration$(NO_COLOR)"
	$(DC) exec api-dev npx sequelize-cli db:migrate:undo

migration_undo_all: ## Revert all migrations
	echo "$(OK_COLOR)Revert all migrations$(NO_COLOR)"
	$(DC) exec api-dev npx sequelize-cli db:migrate:undo:all

seed_all: ## Run every seeder
	echo "$(OK_COLOR)Run every seeder$(NO_COLOR)"
	$(DC) exec -T api-dev npx sequelize-cli db:seed:all

seed_undo: ## Deletes data from the database
	echo "$(OK_COLOR)Deletes data from the database$(NO_COLOR)"
	$(DC) exec api-dev npx sequelize-cli db:seed:undo

seed_undo_all: ## Deletes data from the database
	echo "$(WARN_COLOR)Deletes data from the database$(NO_COLOR)"
	$(DC) exec api-dev npx sequelize-cli db:seed:undo:all