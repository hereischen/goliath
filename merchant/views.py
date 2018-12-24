# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect
from django.views.generic import View
from django.contrib.auth import (authenticate,
                                 login,
                                 logout,
                                 hashers)
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Merchant
from .forms import LoginForm, RegisterForm
from .serializers import MerchantSerializer


class LoginView(View):
    """用户登录."""

    def get(self, request):
        return render(request, 'login.html', {'login': LoginForm()})

    def post(self, request):
        forms = LoginForm(request.POST)
        if forms.is_valid():
            username = forms.cleaned_data['username']
            password = forms.cleaned_data["password"]
            user = authenticate(username=username, password=password)
            if user is None:
                return render(request, 'login.html', {'login': LoginForm(),
                              'message': '输入的账号或密码有误!'})
            if not user.is_active:
                return render(request, 'login.html', {'login': LoginForm(),
                              'message': '输入的账号被禁用!'})
            login(request, user)
            # FIXME! inventory页(in dev)
            return redirect(to='inventory:index')
        return render(request, 'login.html', {'login': LoginForm(),
                      'message': '输入的信息不全!'})


class LogoutView(View):
    """用户登出."""

    def get(self, request):
        logout(request)
        return redirect(to='merchant:login')


class RegisterView(View):
    """商户注册."""

    def get(self, request):
        return render(request, 'register.html', {'forms': RegisterForm()})

    def post(self, request):
        forms = RegisterForm(request.POST)
        if forms.is_valid():
            username = forms.cleaned_data["username"]
            if Merchant.objects.filter(username=username):
                return render(request, 'register.html',
                              {'message': '该用户名已被注册！', 'forms': forms})
            password = forms.cleaned_data["password"]
            password1 = forms.cleaned_data["password1"]
            if password != password1:
                return render(request, 'register.html',
                              {'message': '两次输入的密码不同！', 'forms': forms})
            user = Merchant()
            user.username = username
            user.password = hashers.make_password(password)
            user.name = forms.cleaned_data["name"]
            user.mobile = forms.cleaned_data["mobile"]
            user.email = forms.cleaned_data["email"]
            user.address = forms.cleaned_data["address"]
            user.dingding = forms.cleaned_data["dingding"]
            user.save()
            return redirect(to='merchant:login')
        return render(request, 'register.html',
                      {'message': '验证码错误！', 'forms': forms})


class MerchantListView(APIView):
    """返回所有合作商户基本信息."""

    def get(self, request, format=None):
        merchants = (Merchant.objects.all()
                                     .exclude(is_staff=True)
                                     .exclude(is_superuser=True))
        serializer = MerchantSerializer(merchants, many=True)
        return Response(serializer.data)
