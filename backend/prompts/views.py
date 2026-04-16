import json
import logging
import redis
import traceback
import os

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Prompt

logger = logging.getLogger(__name__)

REDIS_HOST = os.environ.get("REDIS_HOST", "redis")
r = redis.Redis(host=REDIS_HOST, port=6379, db=0)


@csrf_exempt
def prompt_list_create(request):
    if request.method == "GET":
        prompts = Prompt.objects.all().values(
            "id", "title", "complexity", "created_at"
        )
        return JsonResponse(list(prompts), safe=False)

    if request.method == "POST":
        try:
            data = json.loads(request.body)

            title = data.get("title", "").strip()
            content = data.get("content", "").strip()
            complexity = data.get("complexity")

            # Validation
            if len(title) < 3:
                return JsonResponse({"error": "Title must be at least 3 characters"}, status=400)

            if len(content) < 20:
                return JsonResponse({"error": "Content must be at least 20 characters"}, status=400)

            if not isinstance(complexity, int) or not (1 <= complexity <= 10):
                return JsonResponse({"error": "Complexity must be between 1 and 10"}, status=400)

            prompt = Prompt.objects.create(
                title=title,
                content=content,
                complexity=complexity
            )

            return JsonResponse({
                "message": "Prompt created successfully",
                "id": prompt.id
            })

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


def prompt_detail(request, id):
    try:
        prompt = Prompt.objects.get(id=id)
        
        key = f"prompt:{id}:views"
        view_count = r.incr(key)
        
        return JsonResponse({
            "id": prompt.id,
            "title": prompt.title,
            "content": prompt.content,
            "complexity": prompt.complexity,
            "created_at": prompt.created_at,
            "view_count": view_count
        })
    
    except Exception as e:
        return JsonResponse({
            "error": str(e),
            "trace": traceback.format_exc()
        }, status=500)
