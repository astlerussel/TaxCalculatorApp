import Hst from "./Hst.js";
import "https://code.jquery.com/jquery-1.12.1.min.js";

$(document).ready(()=>{
    $("#calculate").click((evt)=>{
        evt.preventDefault();
        const nAmount = $("#price").val();
        const oHst = new Hst();
        $("#amount").html(nAmount);
        $("#hst").html(oHst.calculate(nAmount, "ON"));
    })
});

