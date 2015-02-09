from django import forms
from django.forms import ModelForm, CharField
from django.forms.widgets import TextInput
from models import *


# class KpiForm(forms.Form):
# 	responsable		= forms.CharField(widget=forms.TextInput())
# 	tipo			= forms.CharField(widget=forms.TextInput())
# 	metrica			= forms.CharField(widget=forms.TextInput())	

class addKpiForm(forms.ModelForm):
	class Meta:
		model = Indicador
		exclude = {'status', }

# class OrganizacionForm(forms.Form):
# 	nombre	= forms.CharField(widget=forms.TextInput())
# 	logo	= forms.CharField(widget=forms.TextInput())
# 	color 	= forms.CharField(widget=forms.TextInput())

class addOrganizacionForm(forms.ModelForm):
	class Meta:
		model = Organizacion
		widgets = {
			'txt_color': TextInput(attrs={'type': 'color'}),
		}
		exclude = {'status', }

class addRepresentanteForm(forms.ModelForm):
	class Meta:
		model = Representante
		exclude = {'status', }