/* global $ */
$(document).ready(function(){
  var submitButton = document.getElementById('submitButton');
  // submitButton.style.visibility="hidden";
  
  $.get( "https://cors.io/?http://rest.kegg.jp/list/genome", function( data ) {
      dropdownData(data);
  });

  function fillPathways(data){
    var unorderedList = document.getElementById('pathways');
    unorderedList.innerHTML = ""
    var lineArr = data.split('\n');
    for (var i=0; i<lineArr.length-2; i = i+2){
      var line = lineArr[i].split('\t');
      var line1 = lineArr[i+1].split('\t');
      var pathWayKey = line[0].split(':')[1]
      var pathway = line[1].split(' - ')[0]
      var pathWayKey1 = line1[0].split(':')[1]
      var pathway1 = line1[1].split(' - ')[0]
      var item = document.createElement('li');
      var div = document.createElement('div');
      var displayTitle = document.createElement('p');
      var displayTitle2 = document.createElement('p');
      displayTitle.setAttribute('class', 'checkbox_p');
      displayTitle2.setAttribute('class', 'checkbox_p');
      displayTitle.innerHTML = '<input type ="checkbox" value=\''+pathWayKey+'\' \>' + pathway;
      displayTitle2.innerHTML = '<input type ="checkbox" value=\''+pathWayKey1+'\' \>' + pathway1;
      div.appendChild(displayTitle);
      div.appendChild(displayTitle2);
      item.appendChild(div);
      unorderedList.appendChild(item);    
    }
    
  }



  function dropdownData(res){ 

      var getData = res.split("\n");
      
      var form = document.getElementById("dropdownForm");
      var dropdown = document.createElement("select");
      $(dropdown).addClass("styled-select");
      dropdown.id = "genomeData"
      dropdown.onchange = function(e) {
        
        var loadDiv = document.getElementById("loadHere");
        loadDiv.classList.add("loader");
         $.get("https://cors.io/?http://rest.kegg.jp/list/pathway/"+e.target.value, function( data ) {
          loadDiv.classList.remove("loader");
          submitButton.style.visibility="visible";
          fillPathways(data);
        });
      };
      
      var defaultOption = document.createElement("option");
      
      defaultOption.text = "-------Select-------";
      defaultOption.selected = true;
      defaultOption.disabled = true;
      
      dropdown.appendChild(defaultOption);
      
      for(var i=0; i<getData.length; i++){
      	var temp = getData[i].split(",");
      	if(temp.length > 1){
      		var name = temp[temp.length-1].split("; ")[1];
      		var key = temp[0].split("\t")[1];
      		if (name != undefined && key != undefined){
      			var option = document.createElement("option");
      			option.value = key;
      			option.text = name;
      			dropdown.appendChild(option);
      		}
      	}
      }
      var tempSelect = document.getElementById('tempSelect');
      tempSelect.parentNode.removeChild(tempSelect);
      form.appendChild(dropdown)
    }
  
});