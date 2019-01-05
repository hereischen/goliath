# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render, redirect
# from django.http import HttpResponse


def index(request):
    if request.user.is_authenticated():
        # FIXME
        return render(request, 'base.html')
    else:
        return redirect(to='merchant:login')
