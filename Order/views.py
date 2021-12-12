from django.shortcuts import render, HttpResponse
from .models import Car, Model, Order
from django.http import JsonResponse

# Create your views here.

def main_view(request):
    qs = Car.objects.all()
    context = {
        'qs':qs
    }
    return render(request, 'index.html',context=context)


def get_json_car_data(request):
    qs_val = list(Car.objects.values())
    context = {
        'data':qs_val
    }
    return JsonResponse(data=context)
    

def get_json_model_data(request, *args, **kwargs):
    selected_Car = kwargs.get('car')
    obj_models = list(Model.objects.filter(car__name=selected_Car).values())
    context = {
        'data': obj_models,
    }
    return JsonResponse(data=context)

def create_order(request):
    if request.is_ajax():
        car = request.POST.get('car')
        car_obj = Car.objects.get(name=car)
        model = request.POST.get('model')
        model_obj = Model.objects.get(name=model)
        Order.objects.create(car=car_obj, model=model_obj)
        return JsonResponse({'created': True})
    return JsonResponse({'created':False}, safe=False)
    
