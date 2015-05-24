.PHONY: run setup install

run:
	./scripts/run.sh

update:
	./scripts/update.sh

setup: 
	./scripts/setup.sh
	./scripts/update.sh
