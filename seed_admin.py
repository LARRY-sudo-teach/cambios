import os
from accounts.models import Usuario

email = os.environ["ADMIN_EMAIL"]
password = os.environ["ADMIN_PASSWORD"]

if not Usuario.objects.filter(email=email).exists():
    Usuario.objects.create_superuser(
        email,
        password,
        nombre_completo="Administrador"
    )