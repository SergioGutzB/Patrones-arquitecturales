from django.conf.urls import patterns, include, url

# Function based API views

# Class based API views
#from api.views import TaskList, TaskDetail
from kpis.views import *
from views import *

urlpatterns = patterns('',

    #Regular URLs
	url(r'^addkpi','kpiApp.views.addKpi_view',name = 'view_addKpi'),
	# url(r'^about/$','kpiApp.views.about',name = 'about'),
	url(r'^addorg/$','kpiApp.views.addOrganizacion_view',name = 'view_addOrg'),
	url(r'^addrepresentante/$','kpiApp.views.addRepresentante_view',name = 'view_addRepresentante'),
	url(r'^lista_org/$', 'kpiApp.views.org_views', name= 'view_lita'),
	url(r'^generador/(?P<id_org>.*)$', 'kpiApp.views.generarOrg_view', name= 'view_generador'),	
	
)