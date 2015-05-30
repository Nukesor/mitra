.PHONY: run setup install

run:
	./scripts/run.sh

update:
	./scripts/update.sh

setup: 
	./scripts/setup.sh
	./scripts/update.sh

arch-install:
	sudo pacman -Sy --noconfirm python-pip python-virtualenv npm

clean:
	rm -rf venv
	rm -rf build
	rm -rf node_modules
	rm -rf mitra/static/bower
	rm -rf mitra/static/js
	rm -rf *__pycache__*

