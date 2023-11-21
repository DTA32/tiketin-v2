$(document).ready(function(){
    // jquery selector vars
    const cardGroup = $("#cardGroup");
    const statusText = $("#statusText");
    const durasiSlider = $("#durasiSlider");
    const hargaSlider = $("#hargaSlider");
    // init
    const dataCount = cardGroup.children().length;
    let maskapaiArray = [];
    let hargaArray = [];
    let durasiArray = [];
    for(let i = 0; i < dataCount; i++){
        const maskapai = $("#"+i+"_maskapai").text();
        if(!maskapaiArray.includes(maskapai)){
            maskapaiArray.push(maskapai);
            $("#maskapaiCheckGroup").append("<div class='form-check'><input class='form-check-input' type='checkbox' value='"+maskapai+"' id='maskapaiCheck_"+i+"'><label class='form-check-label' for='maskapaiCheck_"+i+"'>"+maskapai+"</label></div>")
        }
        const harga = parseInt($("#"+i+"_harga").data('value'));
        hargaArray.push(harga);
        const durasi = parseInt($("#"+i+"_durasi").data('value'));
        durasiArray.push(durasi);
    }
    const minDurasi = Math.min(...durasiArray);
    const maxDurasi = Math.max(...durasiArray);
    const minHarga = Math.min(...hargaArray);
    const maxHarga = Math.max(...hargaArray);
    // function
    // sort
    $("#sortButton").click(function(){
        $("#filterMenu").hide();
        $("#sortMenu").slideToggle();
    })
    $("#sortSubmit").click(function(){
        const sortValue = parseInt($("input[name='sortRadio']:checked").val());
        console.log(sortValue);
        const dataCount = cardGroup.children().length;
        resetOrder();
        if(isNaN(sortValue)){
            statusText.text("Please select sort type");
            statusText.removeClass("text-success");
            statusText.addClass("text-danger");
            statusText.show();
            setTimeout(function(){
                statusText.hide();
            }, 2000);
        }
        else{
            if(sortValue === 1){
                for(let i = 0; i < dataCount; i++){
                    for(let j = 0; j < dataCount; j++){
                        const harga1 = parseInt($("#"+j+"_harga").data('value'));
                        const harga2 = parseInt($("#"+(j+1)+"_harga").data('value'));
                        if(harga1 > harga2){
                            $("#card_"+j).before($("#card_"+(j+1)));

                        }
                    }
                }
            }
            else if(sortValue === 2){
                for(let i = 0; i < dataCount; i++){
                    for(let j = 0; j < dataCount; j++){
                        const durasi1 = parseInt($("#"+j+"_durasi").data('value'));
                        const durasi2 = parseInt($("#"+(j+1)+"_durasi").data('value'));
                        if(durasi1 > durasi2){
                            $("#card_"+j).before($("#card_"+(j+1)));
                        }
                    }
                }
            }
            else if(sortValue === 3){
                for(let i = 0; i < dataCount; i++){
                    for(let j = 0; j < dataCount; j++){
                        const keberangkatan1 = parseInt($("#"+j+"_keberangkatan").data('value'));
                        const keberangkatan2 = parseInt($("#"+(j+1)+"_keberangkatan").data('value'));
                        if(keberangkatan1 > keberangkatan2){
                            $("#card_"+j).before($("#card_"+(j+1)));
                        }
                    }
                }
            }
            else if(sortValue === 4){
                for(let i = 0; i < dataCount; i++){
                    for(let j = 0; j < dataCount; j++){
                        const kedatangan1 = parseInt($("#"+j+"_kedatangan").data('value'));
                        const kedatangan2 = parseInt($("#"+(j+1)+"_kedatangan").data('value'));
                        if(kedatangan1 > kedatangan2){
                            $("#card_"+j).before($("#card_"+(j+1)));
                        }
                    }
                }
            }
            sortSuccess();
        }
    })
    $("#sortReset").click(function(){
        resetOrder();
        $('input[name="sortRadio"]').prop('checked', false);
        statusText.text("Sort cleared");
        statusText.removeClass("text-danger");
        statusText.addClass("text-success");
        statusText.show();
        setTimeout(function(){
            statusText.hide();
        }, 2000);
    });
    function resetOrder() {
        for(let i = 0; i < cardGroup.children().length; i++){
            cardGroup.append($("#card_"+i));
        }
    }
    function sortSuccess(){
        statusText.text("Sorted successfully");
        statusText.removeClass("text-danger");
        statusText.addClass("text-success");
        statusText.show();
        setTimeout(function(){
            statusText.hide();
        }, 2000);
    }
    // filter
    $("#filterButton").click(function(){
        $("#sortMenu").hide();
        $("#filterMenu").slideToggle();
    })
    $("#maskapaiFilterButton").click(function(){
        $("#maskapaiCheckGroup").slideToggle();
    })
    $("#keberangkatanFilterButton").click(function(){
        $("#keberangkatanCheckGroup").slideToggle();
    })
    // durasi
    function toHoursAndMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return `${hours}j ${minutes}m`;
    }
    $("#durasiFilterButton").click(function(){
        $("#durasiRange").text(toHoursAndMinutes(durasiSlider.slider("values", 0))+" - "+ toHoursAndMinutes(durasiSlider.slider("values", 1)));
        $("#durasiRangeGroup").slideToggle();
    })
    durasiSlider.slider({
        range: true,
        min: minDurasi,
        max: maxDurasi,
        step: 10,
        values: [minDurasi, maxDurasi],
        slide: function(event, ui){
            $("#durasiRange").text(toHoursAndMinutes(ui.values[0]) + " - " + toHoursAndMinutes(ui.values[1]));
        }
    });
    // harga
    const rupiah = (number)=>{
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
    }
    $("#hargaFilterButton").click(function(){
        $("#hargaRange").text(rupiah(hargaSlider.slider("values", 0))+" - "+ rupiah(hargaSlider.slider("values", 1)));
        $("#hargaRangeGroup").slideToggle();
    })
    hargaSlider.slider({
        range: true,
        min: minHarga,
        max: maxHarga,
        step: 5000,
        values: [minHarga, maxHarga],
        slide: function(event, ui){
            $("#hargaRange").text(rupiah(ui.values[0]) + " - " + rupiah(ui.values[1]));
        }
    });
    $("#filterSubmit").click(function(){
        // check checked filter
        const maskapaiFilter = [];
        const keberangkatanFilter = [];
        for(let i = 0; i < maskapaiArray.length; i++){
            if($("#maskapaiCheck_"+i).is(":checked")){
                maskapaiFilter.push($("#maskapaiCheck_"+i).val());
            }
        }
        for(let i = 1; i <= 4; i++){
            if($("#keb"+i).is(":checked")){
                const range = $("#keb"+i).val().split(",");
                keberangkatanFilter.push(range);
            }
        }
        // check if all filter empty
        const keberangkatanFilterEmpty = parseInt(keberangkatanFilter.length) === 0;
        const maskapaiFilterEmpty = parseInt(maskapaiFilter.length) === 0;
        const durasiFilterEmpty = parseInt(durasiSlider.slider("values", 0)) === minDurasi && parseInt(durasiSlider.slider("values", 1)) === maxDurasi;
        const hargaFilterEmpty = parseInt(hargaSlider.slider("values", 0)) === minHarga && parseInt(hargaSlider.slider("values", 1)) === maxHarga;
        if(keberangkatanFilterEmpty && maskapaiFilterEmpty && durasiFilterEmpty && hargaFilterEmpty){
            $("#filterReset").trigger("click");
            statusText.text("No filter selected, filter cleared");
            statusText.removeClass("text-success");
            statusText.addClass("text-danger");
            statusText.show();
            setTimeout(function(){
                statusText.hide();
            }, 2000);
        }
        // filter
        else{
            for(let i = 0; i < dataCount; i++){
                const maskapai = $("#"+i+"_maskapai").text();
                const keberangkatan = parseInt($("#"+i+"_keberangkatan").data('value'));
                const durasi = parseInt($("#"+i+"_durasi").data('value'));
                const harga = parseInt($("#"+i+"_harga").data('value'));
                const maskapaiFilterCondition = maskapaiFilter.length > 0 ? maskapaiFilter.includes(maskapai) : true;
                const keberangkatanFilterCondition = keberangkatanFilter.length > 0 ? keberangkatanFilter.some(range => keberangkatan >= range[0] && keberangkatan <= range[1]) : true;
                const durasiFilterCondition = (durasi >= durasiSlider.slider("values", 0)) && (durasi <= durasiSlider.slider("values", 1));
                const hargaFilterCondition = harga >= hargaSlider.slider("values", 0) && harga <= hargaSlider.slider("values", 1);
                if(maskapaiFilterCondition && keberangkatanFilterCondition && durasiFilterCondition && hargaFilterCondition){
                    $("#card_"+i).show();
                }
                else{
                    $("#card_"+i).hide();
                }
            }
            filterSuccess();
        }
    })
    $("#filterReset").click(function(){
        for(let i = 0; i < maskapaiArray.length; i++){
            $("#maskapaiCheck_"+i).prop('checked', false);
        }
        for(let i = 0; i < 4; i++){
            $("#keberangkatanCheck_"+i).prop('checked', false);
        }
        durasiSlider.slider("values", [minDurasi, maxDurasi]);
        $("#durasiRange").text(toHoursAndMinutes(minDurasi)+" - "+ toHoursAndMinutes(maxDurasi));
        hargaSlider.slider("values", [minHarga, maxHarga]);
        $("#hargaRange").text(rupiah(minHarga)+" - "+ rupiah(maxHarga));
        for(let i = 0; i < dataCount; i++){
            $("#card_"+i).show();
        }
        statusText.text("Filter cleared");
        statusText.removeClass("text-danger");
        statusText.addClass("text-success");
        statusText.show();
        setTimeout(function(){
            statusText.hide();
        }, 2000);
    })
    function filterSuccess(){
        statusText.text("Filtered successfully");
        statusText.removeClass("text-danger");
        statusText.addClass("text-success");
        statusText.show();
        setTimeout(function(){
            statusText.hide();
        }, 2000);
    }
})
