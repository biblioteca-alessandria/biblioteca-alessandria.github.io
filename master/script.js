function getParameter(key){ 
    address = window.location.search 
    parameterList = new URLSearchParams(address) 
    return parameterList.get(key) 
}
function getAllParameters(key){ 
    address = window.location.search 
    parameterList = new URLSearchParams(address) 
    return parameterList.getAll(key) 
}

node =  document.getElementById('cardsContainer');
tagslistnode = document.getElementById('tagsContainer');
yearslistnode = document.getElementById('yearsContainer');
currentTags=getAllParameters("tag")
allTags =[]
getYear=getAllParameters("year")
selectedYear = getYear.length>0?getYear[0]:0

function loadNotes(notes){
    for ([index, note] of notes.entries()){
        var div=document.createElement('div');
        div.setAttribute('class', "card overflow-hidden shadow-clickable rounded-4 border-0 mb-5");
        div.setAttribute('onclick', `location.href='${note.link}';`);
        div.setAttribute("style", "cursor: pointer;");
        string  = "";
        for (tag of note.tags){
            if(tag!="Free")
            string += `<a href = "?tag=` + tag+ `"> #` + tag + `</a> `;
        }
        div.innerHTML = `<div class="card-body p-0">
                <div class="d-flex align-items-center">
                    <div class="p-5" style="width:100%;">
                        <div class="d-flex align-items-center justify-content-between mb-4 d-flex-scale" style="margin: 0 !important;">
                            <h2 class="fw-bolder mb-0"> ${note.title}</h2>
                            </div>
                            <div class="d-flex" style = "justify-content: space-between; align-items: center; flex-wrap: wrap;" >
                            <div class="p-2">    
                            ${note.teacher}
                            </div>
                            <div class="badge bg-gradient-primary-to-secondary text-white" style = "cursor: pointer" onclick="selectYear(${note.year})"><div class="text-uppercase">Anno ${note.year}</div></div>
                            </div>
                        <p class="p-2" style="margin-bottom: 0rem; !important">
                            ${string}
                        </p>
                    </div>
                </div>
            </div>`
        flag = true;
        if (note.year != selectedYear && selectedYear != 0){
            flag = false;
        }
        for(tag of currentTags){
            if(!note.tags.includes(tag)){
                flag = false;
                break;
            }
        }
        if(flag){
            node.appendChild(div);
        }
        for (tag of note.tags){
            if(!allTags.includes(tag)){
                allTags.push(tag);
            }
        }
    }
    // <button class="btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder activeTag" onclick="addTag('prova');">#prova</buttonm>
    for(year of [1,2,3]){
        var btn = document.createElement('button');
        if(parseInt(selectedYear) == parseInt(year)){
            btn.setAttribute('class', 'btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder activeTag');
            btn.setAttribute('onclick', 'selectYear(0)');
        }else{
            btn.setAttribute('class', 'btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder tag');
            btn.setAttribute('onclick', 'selectYear('+year+')');
        }
        btn.innerHTML="Anno "+year;
        yearslistnode.appendChild(btn);
    }
    for(tag of currentTags){
        var btn = document.createElement('button');
        btn.setAttribute('class', 'btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder activeTag');
        btn.setAttribute('onclick', `removeTag('${tag}')`);
        btn.innerHTML="#"+tag;
        tagslistnode.appendChild(btn);
    }
    for(tag of allTags){
        if(!currentTags.includes(tag)){
            var btn = document.createElement('button');
            btn.setAttribute('class', 'btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder tag');
            btn.setAttribute('onclick', `addTag('${tag}')`);
            btn.innerHTML="#"+tag;
            tagslistnode.appendChild(btn);
        }
    }
}

// function loadSingleNote(notes, index){
//     note = notes[index];
//     var div=document.createElement('div');
//     div.setAttribute('class', "card overflow-hidden shadow rounded-4 border-0 mb-5");
//     string  = "";
//     for (tag of note.tags){
//         if(tag!="Free")
//         string += `<a href = "?tag=` + tag+ `"> #` + tag + `</a> `;
//     }
//     div.innerHTML = `<div class="card-body p-0">
//                 <div class="d-flex align-items-center">
//                     <div class="p-5" style="width:100%;">
//                         <div class="d-flex align-items-center justify-content-between mb-4 d-flex-scale" style="margin: 0 !important;">
//                             <h2 class="fw-bolder mb-0"> ${note.title}</h2>
//                             <a class="btn btn-primary px-4 py-3" href="${note.link}">
//                                 <div class="d-inline-block bi bi-box-arrow-up-right me-2"></div>
//                                     Apri
//                             </a>
//                             </div>
//                             <div class="d-flex" style = "justify-content: space-between; align-items: center;" >
//                             <div class="p-2">    
//                             ${note.teacher}
//                             </div>
//                             <div class="badge bg-gradient-primary-to-secondary text-white" style = "cursor: pointer" onclick="selectYear(${note.year})"><div class="text-uppercase">Anno ${note.year}</div></div>
//                             </div>
//                         <div class="bg-light p-4 rounded-4">    
//                         ${note.text}
//                         </div>
//                         <p class="p-2">
//                             ${string}
//                         </p>
//                     </div>
//                 </div>
//             </div>`
//     node.appendChild(div);
// }


// MAIN
fetch("notes.json")
    .then((response) => response.json())
        .then((json) => notes = json)
            .then(
                (notes)=>{
                    index = getParameter("index");
                    // if(index==null){
                    //     loadNotes(notes);
                    // }else{
                    //     loadSingleNote(notes, index);
                    // }
                    loadNotes(notes);
                }
            )

string = "";

function addTag(tagname){
    currentTags.push(tagname);
    goToTags();
}
function removeTag(tagname){
    index = currentTags.indexOf(tagname);
    if (index > -1) {
        currentTags.splice(index, 1);
    }
    goToTags()
}

function selectYear(num){
    if(num == parseInt(selectedYear)){
        selectedYear = 0;
        goToTags();
    }else{
        selectedYear = num;
        goToTags();
    }
}

function goToTags(){
    string="?";
    if(selectedYear!=0){
        string+="year="+selectedYear
    }
    for([index,tag] of currentTags.entries()){
        if(index != 0 || selectedYear!=0){
            string += "&";
        }
        string += "tag=";
        string += tag;
    }
    location.href=string;
}


