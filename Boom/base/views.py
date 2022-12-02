from django.shortcuts import render
from agora_token_builder import RtcTokenBuilder
from django.http import JsonResponse
import random, time

# Create your views here.

def getToken(request):
    appId = '03c16643bcf841a5955a9e798819ac68'
    appCertificate = '215cc4bb01a740d793bba5b3134a6641'
    channelName = request.GET.get('channel')
    UID = random.randint(1, 250)
    expirationTimeInSeconds = 3600 * 3
    currentTimeStamp = time.time()
    privilegeExpiredTs = currentTimeStamp + expirationTimeInSeconds
    role = 1

    token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, UID, role, privilegeExpiredTs)
    return JsonResponse({'token':token, 'UID':UID}, safe=False)

def home(request):
    return render(request, 'base/home.html')

def room(request):
    return render(request, 'base/room.html')    

def signup(request):
    return render(request, 'base/signup.html')

def login(request):
    return render(request, 'base/login.html')