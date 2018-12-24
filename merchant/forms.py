# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django import forms
from captcha.fields import CaptchaField


class LoginForm(forms.Form):
    username = forms.CharField(label='账号', required=True, max_length=64,
                               widget=forms.TextInput(
                                   attrs={"class": "form-control",
                                          "id": "id_login",
                                          "placeholder":
                                          "请输入登录账号"}))
    password = forms.CharField(label='密码', required=True, min_length=6,
                               widget=forms.PasswordInput(
                                   attrs={"class": "form-control",
                                          "id": "id_password",
                                          "name": "password",
                                          "placeholder": "请输入密码"}))


class RegisterForm(forms.Form):
    username = forms.CharField(required=True, max_length=64, min_length=2,
                               widget=forms.TextInput(
                                   attrs={"class": "form-control",
                                          "id": "id_username",
                                          "type": "text",
                                          "placeholder": "请输入登录账号"}))
    password = forms.CharField(initial='请输入密码', required=True, max_length=20,
                               min_length=6,
                               widget=forms.PasswordInput(
                                   attrs={"class": "form-control",
                                          "id": "id_password1",
                                          "placeholder": "请输入密码"}))
    password1 = forms.CharField(initial='请再输入密码', required=True, max_length=20,
                                min_length=6,
                                widget=forms.PasswordInput(
                                    attrs={"class": "form-control",
                                           "id": "id_password1",
                                           "placeholder": "请确定密码"}))
    email = forms.EmailField(required=True,
                             widget=forms.EmailInput(
                                 attrs={"class": "form-control",
                                        "placeholder": "请输入邮箱"}))
    mobile = forms.CharField(label='手机号码', required=True, max_length=11,
                             min_length=10,
                             widget=forms.TextInput(
                                 attrs={"class": "form-control",
                                        "placeholder": "请输入手机号码"}))
    name = forms.CharField(label='公司名', required=True,
                           widget=forms.TextInput(
                               attrs={"class": "form-control",
                                      "placeholder": "请输入公司名"}))
    address = forms.CharField(label='公司地址', required=False,
                              widget=forms.TextInput(
                                  attrs={"class": "form-control",
                                         "placeholder": "请输入公司地址"}))
    dingding = forms.CharField(label='公司名', required=False,
                               widget=forms.TextInput(
                                   attrs={"class": "form-control",
                                          "placeholder": "请输入钉钉"}))
    captcha = CaptchaField(error_messages={'message': '验证码错误!'})
