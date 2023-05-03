
class MultiSelectjs {

    constructor(opts = {}){
        this.element = opts.element ? opts.element : null;
        this.allowSearch = opts.allowSearch ? opts.allowSearch : null;
        this.randomID = opts.randomID ? opts.randomID : Math.floor(Math.random() * (9999 + 1));
        this.searchMinLength = opts.searchMinLength ? opts.searchMinLength : 4;
        this.disabled = opts.disabled ? opts.disabled : (this.element !== null ? this.element.disabled : false);
        this.checkedColor = opts.checkedColor ? opts.checkedColor : "#9686a8";
        this.createMultiSelectjs();
    }

    createMultiSelectjs() {
        if (this.element === null)
            return false;

        this.element.classList.add("multiselectjs-hidden");

        // DIV Contenedor del select nuevo
        let newSelect = document.createElement('div');
        newSelect.classList.add(this.randomID.toString(), "multiselectjs-mb-4", "multiselectjs-relative")
        newSelect.dataset.disabled = this.disabled;

        // DIV Contenedor de los elementos seleccionados
        let topDiv = document.createElement("div");
        topDiv.classList.add(this.disabled ? "multiselectjs-cursor-default" : "multiselectjs-cursor-pointer", "multiselectjs-flex", "multiselectjs-justify-between", "multiselectjs-border", "multiselectjs-border-gray-300", "multiselectjs-border-solid", "multiselectjs-rounded-lg", "multiselectjs-py-2", "multiselectjs-px-4", this.disabled ? "multiselectjs-bg-gray-100" : "multiselectjs-bg-white");

        let holder_left = document.createElement("div");
        holder_left.classList.add("selected", "multiselectjs-flex", "multiselectjs-gap-x-2", "multiselectjs-cursor-default", "multiselectjs-overflow-hidden");

        let holder_right = document.createElement("div");
        holder_right.classList.add(this.disabled ? "invisible" : "visible", "options");
        holder_right.innerHTML = `<i class="fa fa-chevron-down" aria-hidden="true"></i>`;

        topDiv.appendChild(holder_left);
        topDiv.appendChild(holder_right);

        let bottomDiv = document.createElement("div");
        bottomDiv.classList.add("multiselectjs-border-solid", "multiselectjs-border", "multiselectjs-border-gray-200", "multiselectjs-px-4", "multiselectjs-animate-[animate-fade_0.2s_ease-in-out]", "multiselectjs-hidden", "multiselectjs-shadow-lg", "multiselectjs-rounded-b-lg", "multiselectjs-absolute", "multiselectjs-w-full", "multiselectjs-z-10", "multiselectjs-bg-white");

        if(this.allowSearch && this.disabled === false){
            let search = document.createElement("input")
            search.classList.add("multiselectjs-border-0", "multiselectjs-outline-0", "multiselectjs-w-full", "multiselectjs-py-4", "multiselectjs-border-b", "multiselectjs-border-solid", "multiselectjs-border-gray-200");
            search.placeholder = "Buscar";
            search.addEventListener("keyup", (e) => {
                let OptionsDiv = e.target.parentElement.querySelector("div.divoptions");
                let searchOptionsDiv = e.target.parentElement.querySelector("div.divsearchoptions");

                if(e.target.value.length < this.searchMinLength){
                    searchOptionsDiv.classList.add("multiselectjs-hidden");
                    OptionsDiv.classList.remove("multiselectjs-hidden");
                    return false;
                }

                OptionsDiv.classList.add("multiselectjs-hidden");
                searchOptionsDiv.classList.remove("multiselectjs-hidden");
                searchOptionsDiv.replaceChildren()
                Array.from(e.target.parentElement.parentElement.querySelectorAll("div.divoptions div span .innerText"))
                    .filter(el => {
                        if(el.textContent.toLowerCase().startsWith(e.target.value.toLowerCase())){
                            let f = el.parentElement.parentElement.cloneNode(true);
                            f.addEventListener("click", (e) => {
                                let ttt = null
                                if(e.target.tagName === "DIV")
                                    ttt = e.target;
                                else if(e.target.tagName === "SPAN")
                                    ttt = e.target.parentElement;
                                else if(e.target.tagName === "I")
                                    ttt = e.target.parentElement.parentElement;

                                OptionsDiv.querySelector("div[data-value='"+ttt?.dataset.value+"']")?.click();
                                let h = ttt?.querySelector("input");
                                h.checked = !h.checked;
                            });
                            searchOptionsDiv.appendChild(f);
                            return true;
                        }
                    });

            });
            bottomDiv.appendChild(search);
        }
        let selectSearchOptions = document.createElement("div");
        selectSearchOptions.classList.add("divsearchoptions", "multiselectjs-hidden", "multiselectjs-grid", "multiselectjs-py-2", "multiselectjs-px-2", "!multiselectjs-max-h-96", "multiselectjs-overflow-y-auto");

        let selectOptions = document.createElement("div");
        selectOptions.classList.add("divoptions", "multiselectjs-grid", "multiselectjs-py-2", "multiselectjs-px-2", "!multiselectjs-max-h-96", "multiselectjs-overflow-y-auto");

        this.element.querySelectorAll("option").forEach((option) => {
            let option_ = document.createElement("div");
            option_.classList.add("hover:multiselectjs-bg-gray-200", "multiselectjs-py-2", "multiselectjs-pl-2", "multiselectjs-rounded-lg", "multiselectjs-cursor-pointer");
            option_.dataset.value = option.value;

            if(option.dataset.unique !== undefined && option.dataset.unique !== null)
                option_.dataset.unique = option.dataset.unique;

            if(option.dataset.uniqgroup !== undefined && option.dataset.uniqgroup !== null)
                option_.dataset.uniqgroup = option.dataset.uniqgroup;

            option_.innerHTML = `<input disabled type="checkbox" class="!multiselectjs-mt-0 !multiselectjs-p-4 multiselectjs-border multiselectjs-border-gray-400 multiselectjs-border-solid multiselectjs-pointer-events-none multiselectjs-text-[${this.checkedColor}] multiselectjs-rounded-md"><span class="multiselectjs-text-2xl multiselectjs-text-gray-600 multiselectjs-ml-2">`+(option.dataset.beforetitle !== undefined ? `${option.dataset.beforetitle}` : '')+`<a class="innerText hover:multiselectjs-decoration-none multiselectjs-pointer-events-none multiselectjs-text-gray-600">${option.text}</a>`+(option.dataset.aftertitle !== undefined ? `${option.dataset.aftertitle}` : '')+`</span>`
            option_.onclick = function (x) {
                let opelement = x.target.tagName === "SPAN" ? x.target.parentElement : x.target;
                let opselect = opelement.parentElement.parentElement.parentElement.querySelector("select option[value='"+opelement.dataset.value+"']");
                let inputopselect = opelement.querySelector("input");

                if(opselect.hasAttribute("selected")) {
                    opselect.removeAttribute("selected");
                    opelement.removeAttribute("selected");
                } else {
                    if(opelement.dataset.unique === "true") {
                        opelement.parentElement.querySelectorAll(`div:not([data-uniqgroup='${opelement.dataset.uniqgroup}'])[selected=true]`).forEach((dopts) => {
                            let optSearch = opelement.parentElement.parentElement.querySelector(`.divsearchoptions div[data-value='${dopts.dataset.value}'] input`);
                            if(optSearch !== null)
                                optSearch.checked = false;
                            dopts.click();
                        });
                    } else {
                        opelement.parentElement.querySelector("div[selected='true'][data-unique='true']")?.click();
                    }
                    opselect.setAttribute("selected", "selected");
                    opelement.setAttribute("selected", true);
                }

                opelement.parentElement.parentElement.parentElement.querySelector("select").dispatchEvent(new Event('change'));
                inputopselect.checked = !inputopselect.checked;

                let selectedDOM = opelement.parentElement.parentElement.parentElement.querySelector("div.selected");
                if(inputopselect.checked) {
                    let sp = document.createElement("span");
                    sp.classList.add("multiselectjs-text-sm", "multiselectjs-px-4", "multiselectjs-rounded-lg", "multiselectjs-bg-gray-200", "multiselectjs-group", "hover:multiselectjs-bg-gray-300", "multiselectjs-inline-flex", "multiselectjs-items-center");
                    sp.dataset.value = opelement.dataset.value;
                    sp.innerText = opelement.querySelector(".innerText").innerText;

                    let nameRemove = document.createElement("i");
                    let disabledSelect = opelement.parentElement.parentElement.parentElement.dataset.disabled === "true";
                    nameRemove.classList.add("fa", "fa-times", "multiselectjs-cursor-pointer", "multiselectjs-text-gray-300", "group-hover:multiselectjs-text-gray-500", "multiselectjs-ml-2");
                    nameRemove.setAttribute("aria-hidden", "true");
                    if(!disabledSelect) {
                        nameRemove.onclick = function (x) {
                            x.target.parentElement.parentElement.parentElement.parentElement.querySelector("div[data-value='"+x.target.parentElement.dataset.value+"']").click();
                            //x.target.parentElement.parentElement.parentElement.parentElement.querySelector("div[data-value*='"+x.target.parentElement.dataset.value+"'] input").checked = false
                            //x.target.parentElement.parentElement.parentElement.parentElement.querySelector("select option[value*='"+x.target.parentElement.dataset.value+"']").removeAttribute("selected");
                            //x.target.parentElement.parentElement.parentElement.parentElement.querySelector("select").dispatchEvent(new Event('change'));
                            x.target.parentElement.remove();
                        }
                        sp.appendChild(nameRemove);
                    }
                    selectedDOM.appendChild(sp);
                } else {
                    selectedDOM.querySelector("span[data-value='"+opelement.dataset.value+"']")?.remove();
                }

            }
            selectOptions.appendChild(option_);
        });

        bottomDiv.appendChild(selectSearchOptions);
        bottomDiv.appendChild(selectOptions);

        newSelect.appendChild(topDiv);
        newSelect.appendChild(bottomDiv);
        this.element.parentNode.insertBefore(newSelect, this.element);
        newSelect.appendChild(this.element);

        if(this.disabled)
            return false;

        newSelect.querySelector("div.selected").parentElement.addEventListener("click", function (x) {
            let ttt = null
            if(x.target.tagName === "DIV")
                ttt = x.target;
            else if(x.target.tagName === "SPAN")
                ttt = x.target.parentElement;
            else if(x.target.tagName === "I")
                ttt = x.target.parentElement.parentElement;

            ttt?.parentElement.querySelector("div.divoptions")?.parentElement.classList.toggle("multiselectjs-hidden");
            ttt?.parentElement.querySelector("div.divoptions")?.parentElement.querySelector("input")?.focus();
        });

        document.addEventListener('click', function(event) {
            if (!newSelect.contains(event.target)) {
                newSelect.querySelector("div.divoptions").parentElement.classList.add("multiselectjs-hidden");
            }
        });
    }

    getSelected() {
        let selected = [];
        this.element.querySelectorAll("option").forEach((option) => {
            if(option.hasAttribute("selected")) {
                selected.push(option.value);
            }
        });
        return selected;
    }

    setSelect(values, opositeValue = true) {

        if(Array.isArray(values)){
            values.forEach((v) => {
                if(opositeValue)
                    this.element.parentElement.querySelector("div[class*='divoptions'] div[data-value='"+v+"']")?.click();
                else{
                    this.element.parentElement.querySelector("div[class*='divoptions'] div:not([selected='true'])[data-value='"+v+"']")?.click();
                }
            })
        }
    }

}
