import requests
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def proxy(request):
    q = request.GET.get('q')
    if not q:
        return Response({"error": "Parametr 'q' jest wymagany"}, status=400)

    l = request.GET.get('l', 'depl')
    in_lang = request.GET.get('in', None)

    params = {'q': q, 'l': l}
    if in_lang:
        params['in'] = in_lang

    try:
        r = requests.get(
            settings.PONS_API_URL, params=params,
            headers={
                "X-Secret": settings.PONS_API_KEY
            },
            timeout=5,
        )
        r.raise_for_status()
    except requests.RequestException as e:
        return Response({"error": str(e)}, status=502)

    return Response(r.json())
