.PHONY: run stop update setup init-db arch-install clean

run: init-db
	./scripts/run.sh

update:
	./scripts/update.sh

setup:
	./scripts/setup.sh
	./scripts/update.sh

init-db:
	./scripts/init-db.sh

arch-install:
	sudo pacman -Sy --noconfirm python-pip python-virtualenv npm

clean:
	rm -rf build
	rm -rf mitra/static/js
	rm -rf *__pycache__*

reset:
	rm -rf venv
	rm -rf build
	rm -rf node_modules
	rm -rf mitra/static/bower
	rm -rf mitra/static/js
	rm -rf *__pycache__*
	git clean -d -f

