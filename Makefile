.PHONY: run setup install

run:
	./scripts/run.sh

update:
	./scripts/update.sh

setup: 
	./scripts/setup.sh
	./scripts/update.sh

watch:
	mkdir -p /mitra/static/js
	./node_modules/react-tools/bin/jsx --extension jsx --watch mitra/src mitra/static/js
