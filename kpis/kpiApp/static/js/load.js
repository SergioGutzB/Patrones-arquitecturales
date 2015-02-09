(function(){
  Handlebars.registerHelper('Italize', function(value){
    return new Handlebars.SafeString(
      "<em>" + value + "</em>");
  });
  Handlebars.registerHelper('Mostrar', function(value){
    if (value){
      return new Handlebars.SafeString(
        "<img src='http://www.marketbi.co/images/chulo-icono.png' alt=' usuario completado' >");
    }else return "";
  });
  Handlebars.registerHelper('Img', function(value1, value2){
    if (value2 == "Derecha"){return new Handlebars.SafeString(
        "<img src='"+value1+"' alt=' usuario completado' class='img der'>");  
    }else{return new Handlebars.SafeString(
        "<img src='"+value1+"' alt=' usuario completado' class='img izq'>");  
    }      
  });

  Handlebars.registerHelper('Titulo', function(nombre, tamano, color, bck){
  	var clr = String(color);
  	var bg = "#fff";
  	console.log(clr)
  	if (bck) {bg=bck;}
    if (tamano == "Pequeno"){return new Handlebars.SafeString(
      "<h3 class='titulo pe' style='color:"+clr+"; background:"+bg+";'"+nombre+"</h3>");
    }else if (tamano == "Mediano"){return new Handlebars.SafeString(
      "<h2 class='titulo me' style='color:"+clr+"; background:"+bg+";'>"+nombre+"</h2>");  
    }else if (tamano == "Grande"){return new Handlebars.SafeString(
      "<h1 class='titulo gr' style='color:"+clr+"; background:"+bg+";'>"+nombre+"</h1>"); 
    }
    document.getElementById("titulo").style.color = clr;
  });

  Handlebars.registerHelper('Kpi', function(kpis){
    if (kpis==1){
      return new Handlebars.SafeString("<button type='button' class='btn btn-default' id='kpiDe' onclick='return kpiDe()'>KPI Desempeño</button>");
      $('#kpiDe').click(function() {
        alert("jajaa");
      })
    }
    if (kpis==2){

      return new Handlebars.SafeString("<button type='button' class='btn btn-default' id='kpiEco' onclick='return kpiEco()'>KPI Económico</button>");
    }
        
  });

})();

$(function (){
  var stemplate = $("#template").html();      
  var tmpl = Handlebars.compile(stemplate);
  var xhr = $.ajax({
    url: "http://localhost:8000/api/org/?format=json"
  });
  
  xhr.done(function(data){
  	var ctx = {}; 
  	for(i=0; i<data.length; i++){      		
  		if (data[i].nombre == $("#id").val())
  			ctx=data[i];
  		else ctx=data[0];
  	} 
  	     
    var html = tmpl(ctx);
    $("#content").append(html); 
    $("#content").show();
  });
});
var dataKpiDe = [];
function kpiDe(){
	$('#tablero').html("<h4>App para indicadores de Desempeño</h4><br>"
		+"<p>El criterio que se debe emplear para medir este tipo de indicaros es SMART. SMART es el acrónimo de Specific, Measurable, Achievable, Relevant y Time-based. Se enfoca en orientarnos a definir objetivos que se puedan medir y sobre los que delimitar KPIs en los que se permita creer, monitorizar y gestionar.</p><hr>"
		+"<p>Indicador de desempeño: Es la expresión cuantitativa construida a partir de variables cuantitativas o cualitativas, que proporciona un medio sencillo y fiable para medir logros (cumplimiento de objetivos y metas establecidas), reflejar los cambios vinculados con las acciones del programa, monitorear y evaluar sus resultados. Los indicadores de desempeño pueden ser indicadores estratégicos o indicadores de gestión.</p><br/>"
		+"<div id='form'>"
		+"Insertar Descripción: <textarea class='form-control' rows='3'></textarea><br/>"
		+"Fecha medición: <input type='date' class='form-control' id='dKpiDe' placeholder='Fecha medición'><br/>"
		+"Valor real: <input type='text' class='form-control' id='vRKpiDe' placeholder='Valor Real'><br/>"
		+"Valor Estimado: <input type='text' class='form-control' id='vEKpiDe' placeholder='Valor Estimado'><br/>"
		+"<button type='button' class='btn btn-default' onclick='return addKpiDe()'>Agregar KPI</button>"
		+"<hr>"
		+"</div>"
		+"<div id='valores'></div>"
		+"<div class='col-md-6'><canvas id='canvas1' height='300' width='400'></canvas></div>"
		+"<div class='col-md-6'><canvas id='canvas2' height='300' width='400'></canvas></div>"
	
	);
}
function kpiEco(){
	$('#tablero').html("<h4>App para indicadores Económicos</h4><hr>"
		+"Descripción: <textarea class='form-control' rows='3'></textarea><br/>"
		+"Valor real: <input type='text' class='form-control' placeholder='Valor Real'><br/>"
		+"Valor Estimado: <input type='text' class='form-control' id='vkpiEco' placeholder='Valor Estimado'><br/>"
		+"<button type='button' class='btn btn-default' onclick='return addKpiEco()'>Agregar KPI</button>"
		+"<hr>"
		+"<p>"+dataKpiDe+"</p>"
	);
}

var dataKpiEco;
var data=[];
function addKpiDe(){	
	var ve= document.getElementById("vEKpiDe").value;	
	var vr= document.getElementById("vRKpiDe").value;
	var fe= document.getElementById("dKpiDe").value;
	document.getElementById("vEKpiDe").value="";
	document.getElementById("vRKpiDe").value="";
	document.getElementById("dKpiDe").value="";
	dataKpiDe.push({'fecha':fe,'valorEstimado':ve, 'valorReal':vr});
	var valDom = document.getElementById("valores");
	valDom.innerHTML =  valDom.innerHTML + "<h1>prueba</h1>";



	data = dataKpiDe;
	var html="";
	html+='<hr><table class="table table-condensed"><thead><tr class="active"><td>Indicador de Desempeño</td><td>Estimado</td><td>Real</td><td>% consecución</td><td>Acumu. Estimado</td><td>Acumu. Real</td><td>% consecución</td></tr></thead><tbody>'
	var acumE=0;
	var acumR=0;
	var fecha="";
	var vE=0;
	var vR=0;
	var labels =[];
	var dataE = [];
	var dataR = [];
	for(var i=0; i<data.length;i++){
		fecha = data[i].fecha;
		vE=data[i].valorEstimado;
		vR=data[i].valorReal;
		labels.push(fecha);
		dataE.push(vE);
		dataR.push(vR);
		acumE = parseFloat(acumE) +parseFloat(vE);
		acumR =parseFloat(acumR)+ parseFloat(vR);
		html+='<tr><td>'+fecha+'</td><td>'+vE+'</td><td>'+vR+'</td><td>'+redondeo(((vR*100)/vE),2)+'%</td><td>'+acumE+'</td><td>'+acumR+'</td><td>'+redondeo(((acumR*100)/acumE),2)+'%</td></tr>'					
	}
	html+='</tbody></table>'

	valDom.innerHTML = html;
	
	//--------------------------------------
	var barChartData = {
		labels : labels,
		datasets : [
			{
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,0.8)",
				highlightFill: "rgba(220,220,220,0.75)",
				highlightStroke: "rgba(220,220,220,1)",
				data: dataE
			},
			{
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,0.8)",
				highlightFill : "rgba(151,187,205,0.75)",
				highlightStroke : "rgba(151,187,205,1)",
				data: dataR
			}
		]

	}

	var lineChartData = {
		labels : labels,
		datasets : [
			{
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,0.8)",
				highlightFill: "rgba(220,220,220,0.75)",
				highlightStroke: "rgba(220,220,220,1)",
				data: dataE
			},
			{
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,0.8)",
				highlightFill : "rgba(151,187,205,0.75)",
				highlightStroke : "rgba(151,187,205,1)",
				data: dataR
			}
		]

	}
	
	var ctx = document.getElementById("canvas1").getContext("2d");
	window.myBar = new Chart(ctx).Bar(barChartData, {
		responsive : true
	});
	var ctx = document.getElementById("canvas2").getContext("2d");
	window.myBar = new Chart(ctx).Line(lineChartData, {
		responsive : true
	});
	
	//--------------------------------------
function redondeo(numero, decimales)
	{
	var flotante = parseFloat(numero);
	var resultado = Math.round(flotante*Math.pow(10,decimales))/Math.pow(10,decimales);
	return resultado;
	}		
}
function addKpiEco(){

}


