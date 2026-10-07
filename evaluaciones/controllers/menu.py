"""CONTROLADOR (MVC): menú principal."""
from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from accounts.models import Usuario

from ..models import Cuestionario, Evaluacion, Periodo


@login_required
def inicio(request):
    # Cualquier usuario ve sus evaluaciones pendientes del periodo activo
    evaluaciones = Evaluacion.objects.pendientes_de(request.user)
    completadas = Evaluacion.objects.con_relaciones().filter(
        evaluador=request.user,
        estado=Evaluacion.Estado.TERMINADA,
    )
    contexto = {
        "evaluaciones": evaluaciones,
        "evaluaciones_completadas": completadas,
    }
    if request.user.es_admin:
        contexto.update({
            "total_usuarios": Usuario.objects.count(),
            "total_cuestionarios": Cuestionario.objects.count(),
            "total_evaluaciones": Evaluacion.objects.count(),
            "total_periodos": Periodo.objects.count(),
            "evaluaciones_creadas": Evaluacion.objects.con_relaciones()[:12],
        })
    return render(request, "evaluaciones/inicio.html", contexto)
