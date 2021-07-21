$(document).ready(function() {
  /* Populate Users Active via DataTable */

  let patientsTable = $("#patientsTable").DataTable({
    serverSide: true,
    processing: true,
    scrollY: "40vh",
    scrollX: true,
    paging: true,
    info: true,
    ajax: {
      url: "./php_action/patients_action.php",
      type: "GET",
      data: {
        populatePatientTbl: 1
      },
      error: function() {
        $(".patientsTable-error").html("");
        $("#patientsTable").append(
          '<tbody class="patientsTable-error text-center"><tr><th colspan="12">No data found in the server</th></tr></tbody>'
        );
        $("#patientsTable_processing").css("display", "none");
      }
    },
    deferRender: true,
    columns: [
      {
        data: null,
        defaultContent: `<button class='btn btn-secondary btn-sm mr-1' data-toggle='modal' id='viewPatientBtn'><i class='fas fa-eye'></i>&nbsp; View</button><button class='btn btn-primary btn-sm' data-toggle='modal' id='editPatientBtn'><i class='fas fa-edit'></i>&nbsp;Edit</button>`
      },
      { data: "patients_id" },
      { data: "first_name" },
      { data: "middle_name" },
      { data: "last_name" },
      { data: "sex" },
      { data: "birthdate" },
      { data: "age" },
      { data: "address", orderable: false },
      { data: "cellphone_number" },
      { data: "landline_number" },
      { data: "weight" }
    ],
    order: [[1, "desc"]]
  });

  let showSuccessModal = false;

  // Focus input on load
  $("#addPatient").on("shown.bs.modal", function(e) {
    $("#firstname").focus();
  });

  let fieldsInfo = {
    firstname: { filter: "names" },
    middlename: { filter: "names" },
    lastname: { filter: "names" },
    residence: { filter: "address" },
    cellphonenumber: { filter: "contact" },
    weight: { filter: "weight" },
    landlinenumber: { filter: "landline" }
  };

  /* Filter input fields from utilities.js */
  filterFieldObject(fieldsInfo);

  // Next button link to treatment tab
  $("#treatmentNext").on("click", function(e) {
    showTab("#nav-treatment", "100px");
  });

  // Previous button link to patient information tab
  $("#infoPrevious").on("click", function(e) {
    showTab("#nav-info", "100px");
  });

  function showTab(showId, scrollTopValue) {
    $(`#nav-tab a[href="${showId}"]`).tab("show");
    $("#addPatientModal").animate({ scrollTop: scrollTopValue }, "slow");
  }

  /* ------------------------------Add Patient -------------------------------------*/

  // Input Fields Id
  let inputFields = [
    "firstname",
    "middlename",
    "lastname",
    "birthdate",
    "age",
    "address",
    "cellphonenumber",
    "landlinenumber",
    "weight",
    "province",
    "cityMunicipality",
    "baranggay",

    "historysite",
    "historysource",
    "historydate",
    "historyplace",
    "historytype"
  ];

  /* ------------Patient Information Tab ------------*/

  /* Date Picker For Patient Birthday from utilities.js */
  setDate("birthdate", "end");

  /* Date Picker For Incident History from utilities.js */
  setDate("historydate", "end");

  // Set Patient Age
  $("#birthdate")
    .datepicker()
    .on("changeDate", function(e) {
      let userBirthdate = $("#birthdate").val();

      if (userBirthdate.length == 0) {
        $("#age").val("");
      } else {
        $("#age").val(getAge(userBirthdate));
      }
    });

  // Format Landline number
  $("#landlinenumber").on("keyup keypress", function() {
    var foo = $(this)
      .val()
      .split("-")
      .join(""); // remove hyphens
    if (foo.length > 0) {
      foo = foo.match(new RegExp(".{1,4}", "g")).join("-");
    }
    $(this).val(foo);
  });

  //Default address
  let nationalCapitalRegionRegionCode = "13";
  let ncrThirdDistrictProvinceCode = "1375";
  let malabonCityMunicipalityCode = "137502";
  let longosBaranggayCode = "137502010";

  initializeAllRegion("#region", nationalCapitalRegionRegionCode);

  defaultAddress();
  function defaultAddress() {
    $("#residence").val("");
    $("#region").val(nationalCapitalRegionRegionCode);
    initializeProvince(
      nationalCapitalRegionRegionCode,
      "#province",
      ncrThirdDistrictProvinceCode
    );
    initializeCityMunicipality(
      ncrThirdDistrictProvinceCode,
      "#cityMunicipality",
      malabonCityMunicipalityCode
    );
    initializeBaranggay(
      malabonCityMunicipalityCode,
      "#baranggay",
      longosBaranggayCode
    );

    disabled(["#cityMunicipality", "#baranggay"], false);
  }

  //When region is change
  $("#region").on("change", function(e) {
    let regionCode = $(this).val();

    initializeProvince(regionCode, "#province");

    emptyField(["#cityMunicipality", "#baranggay"]);
    disabled(["#cityMunicipality", "#baranggay"], true);
  });

  //When Province is change
  $("#province").on("change", function(e) {
    let provinceCode = $(this).val();
    initializeCityMunicipality(provinceCode, "#cityMunicipality");

    disabled(["#cityMunicipality"], false);

    emptyField(["#baranggay"]);
    disabled(["#baranggay"], true);
  });

  //When City/Municipality is change
  $("#cityMunicipality").on("change", function(e) {
    let cityMunicipalityCode = $(this).val();
    initializeBaranggay(cityMunicipalityCode, "#baranggay");

    disabled(["#baranggay"], false);
  });

  function disabled(inputs, status) {
    $.each(inputs, function(index, value) {
      $(value).prop("disabled", status);

      if (status) {
        $(value).removeClass("pointer");
        $(value).addClass("not-allowed");
      } else {
        $(value).removeClass("not-allowed");
        $(value).addClass("pointer");
      }
    });
  }

  function emptyField(inputs) {
    $.each(inputs, function(index, value) {
      $(value).empty();
    });
  }

  // Populate source list
  populateSourceList("#historysource");
  // Populate type list
  populateTypeList("#historytype");

  /* ------------ Treatment Section Tab ------------ */

  // Set Dates for Incident History from utilities.js
  setDate("postdate", "end");
  // Populate source list
  populateSourceList("#postsource");
  // Populate type list
  populateTypeList("#posttype");

  let exposureRows = {
    postExposureRows: {
      day0: {
        date: "postDate0",
        regimen: "postregimenTypeDay0",
        prescription: "postprescriptionDay0",
        addMedicineBtn: "postaddMedicineBtnDay0",
        medicineTable: "postmedicinesTableDay0",
        medicineTbody: "postmedicinestbodyDay0",
        removeRowBtn: "postremoveRowBtnDay0"
      },
      day3: {
        date: "postDate3",
        regimen: "postregimenTypeDay3",
        prescription: "postprescriptionDay3",
        addMedicineBtn: "postaddMedicineBtnDay3",
        medicineTable: "postmedicinesTableDay3",
        medicineTbody: "postmedicinestbodyDay3",
        removeRowBtn: "postremoveRowBtnDay3"
      },
      day7: {
        date: "postDate7",
        regimen: "postregimenTypeDay7",
        prescription: "postprescriptionDay7",
        addMedicineBtn: "postaddMedicineBtnDay7",
        medicineTable: "postmedicinesTableDay7",
        medicineTbody: "postmedicinestbodyDay7",
        removeRowBtn: "postremoveRowBtnDay7"
      },
      day14: {
        date: "postDate14",
        regimen: "postregimenTypeDay14",
        prescription: "postprescriptionDay14",
        addMedicineBtn: "postaddMedicineBtnDay14",
        medicineTable: "postmedicinesTableDay14",
        medicineTbody: "postmedicinestbodyDay14",
        removeRowBtn: "postremoveRowBtnDay14"
      },
      day28_30: {
        date: "postDate28_30",
        regimen: "postregimenTypeDay28_30",
        prescription: "postprescriptionDay28_30",
        addMedicineBtn: "postaddMedicineBtnDay28_30",
        medicineTable: "postmedicinesTableDay28_30",
        medicineTbody: "postmedicinestbodyDay28_30",
        removeRowBtn: "postremoveRowBtnDay28_30"
      }
    },
    preExposureRows: {
      day0: {
        date: "preDate0",
        regimen: "preregimenTypeDay0",
        prescription: "preprescriptionDay0",
        addMedicineBtn: "preaddMedicineBtnDay0",
        medicineTable: "premedicinesTableDay0",
        medicineTbody: "premedicinestbodyDay0",
        removeRowBtn: "preremoveRowBtnDay0"
      },
      day7: {
        date: "preDate7",
        regimen: "preregimenTypeDay7",
        prescription: "preprescriptionDay7",
        addMedicineBtn: "preaddMedicineBtnDay7",
        medicineTable: "premedicinesTableDay7",
        medicineTbody: "premedicinestbodyDay7",
        removeRowBtn: "preremoveRowBtnDay7"
      },
      day21_28: {
        date: "preDate21_28",
        regimen: "preregimenTypeDay21_28",
        prescription: "preprescriptionDay21_28",
        addMedicineBtn: "preaddMedicineBtnDay21_28",
        medicineTable: "premedicinesTableDay21_28",
        medicineTbody: "premedicinestbodyDay21_28",
        removeRowBtn: "preremoveRowBtnDay21_28"
      },
      day1year: {
        date: "preDate1year",
        regimen: "preregimenType1year",
        prescription: "preprescription1year",
        addMedicineBtn: "preaddMedicineBtn1year",
        medicineTable: "premedicinesTable1year",
        medicineTbody: "premedicinestbody1year",
        removeRowBtn: "preremoveRowBtnDay1year"
      },
      day3years: {
        date: "preDate3years",
        regimen: "preregimenType3years",
        prescription: "preprescription3years",
        addMedicineBtn: "preaddMedicineBtn3years",
        medicineTable: "premedicinesTable3years",
        medicineTbody: "premedicinestbody3years",
        removeRowBtn: "preremoveRowBtnDay3years"
      }
    }
  };

  // Initialize Post Exposure Rows
  $.each(exposureRows.postExposureRows, (index, value) => {
    // Set Dates From utilities.js
    setDate(value.date, "both");

    // Initialize Medicines lists from utilities.js
    initializeMedicines(value.prescription);

    // Add medicine when button click
    addMedicine(index, value);

    // Remove medicine row from utilities.js
    removeMedicineRow(value);

    // Set regiment type on all fields if day0 value change
    setRegimeType(
      exposureRows.postExposureRows,
      exposureRows.postExposureRows.day0.regimen
    );
  });

  let postExposureRows = exposureRows.postExposureRows;

  let postDay0 = "#" + postExposureRows.day0.date;
  let postDay3 = "#" + postExposureRows.day3.date;
  let postDay7 = "#" + postExposureRows.day7.date;
  let postDay14 = "#" + postExposureRows.day14.date;
  let postDay28_30 = "#" + postExposureRows.day28_30.date;

  let counterDay14 = false;
  let counterDay28_30 = false;

  $(postDay0).datepicker("update", moment().format("MM-DD-YYYY"));
  initializePostDefaultDate();

  function initializePostDefaultDate() {
    startEndDate(postDay0, postDay3, 3, "days", 1, "days");
    startEndDate(postDay3, postDay7, 4, "days", 1, "days");
    startEndDate(postDay7, postDay14, 7, "days", 1, "days");
    startEndDate(postDay14, postDay28_30, 14, "days", 2, "days");
    removeSelectedDatePost();
  }

  function removeSelectedDatePost() {
    if (!counterDay14) {
      $(postDay14).datepicker("update", "");
    }
    if (!counterDay28_30) {
      $(postDay28_30).datepicker("update", "");
    }
  }

  $(postDay0)
    .datepicker({
      format: "mm-dd-yyyy",
      autoclose: true
    })
    .on("changeDate", function(e) {
      $(this).datepicker("hide");
      if ($(this).val().length > 0) {
        initializePostDefaultDate();
      }
    });

  $(postDay3)
    .datepicker({
      format: "mm-dd-yyyy",
      autoclose: true
    })
    .on("changeDate", function(e) {
      $(this).datepicker("hide");
      if ($(this).val().length > 0) {
        startEndDate(postDay3, postDay7, 4, "days", 1, "days");
        startEndDate(postDay7, postDay14, 7, "days", 1, "days");
        startEndDate(postDay14, postDay28_30, 14, "days", 2, "days");
        removeSelectedDatePost();
      }
    });

  $(postDay7)
    .datepicker({
      format: "mm-dd-yyyy",
      autoclose: true
    })
    .on("changeDate", function(e) {
      $(this).datepicker("hide");
      if ($(this).val().length > 0) {
        startEndDate(postDay7, postDay14, 7, "days", 1, "days");
        startEndDate(postDay14, postDay28_30, 14, "days", 2, "days");
        removeSelectedDatePost();
      }
    });

  $(postDay14)
    .datepicker({
      format: "mm-dd-yyyy",
      autoclose: true
    })
    .on("changeDate", function(e) {
      $(this).datepicker("hide");

      if ($(this).val().length > 0) {
        startEndDate(postDay14, postDay28_30, 14, "days", 2, "days");
        counterDay14 = true;

        allowedField("#" + postExposureRows.day14.regimen);
        allowedField("#" + postExposureRows.day14.prescription);
        allowedField("#" + postExposureRows.day14.addMedicineBtn);

        allowedField("#" + postExposureRows.day28_30.date);
      } else {
        counterDay14 = false;

        notAllowedField("#" + postExposureRows.day14.regimen);
        notAllowedField("#" + postExposureRows.day14.prescription);
        notAllowedField("#" + postExposureRows.day14.addMedicineBtn);
        $("#" + postExposureRows.day14.medicineTbody).empty();

        notAllowedField("#" + postExposureRows.day28_30.date);
        notAllowedField("#" + postExposureRows.day28_30.regimen);
        notAllowedField("#" + postExposureRows.day28_30.prescription);
        notAllowedField("#" + postExposureRows.day28_30.addMedicineBtn);
        $("#" + postExposureRows.day28_30.medicineTbody).empty();

        counterDay28_30 = false;
      }

      removeSelectedDatePost();
    });

  $(postDay28_30)
    .datepicker({
      format: "mm-dd-yyyy",
      autoclose: true
    })
    .on("changeDate", function(e) {
      $(this).datepicker("hide");
      if ($(this).val().length > 0) {
        counterDay28_30 = true;
        allowedField("#" + postExposureRows.day28_30.regimen);
        allowedField("#" + postExposureRows.day28_30.prescription);
        allowedField("#" + postExposureRows.day28_30.addMedicineBtn);
      } else {
        counterDay28_30 = false;
        notAllowedField("#" + postExposureRows.day28_30.regimen);
        notAllowedField("#" + postExposureRows.day28_30.prescription);
        notAllowedField("#" + postExposureRows.day28_30.addMedicineBtn);
        $("#" + postExposureRows.day28_30.medicineTbody).empty();
      }
    });

  // Initialize Pre Exposure Rows
  $.each(exposureRows.preExposureRows, (index, value) => {
    // Set Dates From utilities.js
    setDate(value.date, "both");

    // Initialize Medicines lists from utilities.js
    initializeMedicines(value.prescription);

    // Add medicine when button click
    addMedicine(index, value);

    // Remove medicine row from utilities.js
    removeMedicineRow(value);

    // Set regiment type on all fields if day0 value change
    setRegimeType(
      exposureRows.preExposureRows,
      exposureRows.preExposureRows.day0.regimen
    );
  });

  let preExposureRows = exposureRows.preExposureRows;

  let preDay0 = "#" + preExposureRows.day0.date;
  let preDay7 = "#" + preExposureRows.day7.date;
  let preDay21_28 = "#" + preExposureRows.day21_28.date;
  let preDay1year = "#" + preExposureRows.day1year.date;
  let preDay3years = "#" + preExposureRows.day3years.date;

  let counterDay1year = false;
  let counterDay3years = false;

  $(preDay0).datepicker("update", moment().format("MM-DD-YYYY"));
  initializePreDefaultDate();

  function initializePreDefaultDate() {
    startEndDate(preDay0, preDay7, 7, "days", 1, "days");
    startEndDate(preDay7, preDay21_28, 14, "days", 7, "days");
    startEndDate(preDay21_28, preDay1year, 1, "days", 1, "years");
    startEndDate(preDay1year, preDay3years, 1, "days", 3, "years");
    removeSelectedDatePre();
  }

  function removeSelectedDatePre() {
    if (!counterDay1year) {
      $(preDay1year).datepicker("update", "");
    }
    if (!counterDay3years) {
      $(preDay3years).datepicker("update", "");
    }
  }

  $(preDay0)
    .datepicker({
      format: "mm-dd-yyyy",
      autoclose: true
    })
    .on("changeDate", function(e) {
      $(this).datepicker("hide");
      initializePreDefaultDate();
    });

  $(preDay7)
    .datepicker({
      format: "mm-dd-yyyy",
      autoclose: true
    })
    .on("changeDate", function(e) {
      $(this).datepicker("hide");
      startEndDate(preDay7, preDay21_28, 14, "days", 1, "days");
      startEndDate(preDay21_28, preDay1year, 1, "days", 1, "years");
      startEndDate(preDay1year, preDay3years, 1, "days", 3, "years");
      removeSelectedDatePre();
    });

  $(preDay21_28)
    .datepicker({
      format: "mm-dd-yyyy",
      autoclose: true
    })
    .on("changeDate", function(e) {
      $(this).datepicker("hide");
      startEndDate(preDay21_28, preDay1year, 1, "days", 1, "years");
      startEndDate(preDay1year, preDay3years, 1, "days", 3, "years");
      removeSelectedDatePre();
    });

  $(preDay1year)
    .datepicker({
      format: "mm-dd-yyyy",
      autoclose: true
    })
    .on("changeDate", function(e) {
      $(this).datepicker("hide");
      startEndDate(preDay1year, preDay3years, 1, "days", 3, "years");

      if ($(this).val().length > 0) {
        counterDay1year = true;

        allowedField("#" + preExposureRows.day1year.regimen);
        allowedField("#" + preExposureRows.day1year.prescription);
        allowedField("#" + preExposureRows.day1year.addMedicineBtn);

        allowedField("#" + preExposureRows.day3years.date);
      } else {
        counterDay1year = false;

        notAllowedField("#" + preExposureRows.day1year.regimen);
        notAllowedField("#" + preExposureRows.day1year.prescription);
        notAllowedField("#" + preExposureRows.day1year.addMedicineBtn);
        $("#" + preExposureRows.day1year.medicineTbody).empty();

        notAllowedField("#" + preExposureRows.day3years.date);
        notAllowedField("#" + preExposureRows.day3years.regimen);
        notAllowedField("#" + preExposureRows.day3years.prescription);
        notAllowedField("#" + preExposureRows.day3years.addMedicineBtn);
        $("#" + preExposureRows.day3years.medicineTbody).empty();

        counterDay3years = false;
      }
      removeSelectedDatePre();
    });

  $(preDay3years)
    .datepicker({
      format: "mm-dd-yyyy",
      autoclose: true
    })
    .on("changeDate", function(e) {
      $(this).datepicker("hide");
      if ($(this).val().length > 0) {
        counterDay3years = true;
        allowedField("#" + preExposureRows.day3years.regimen);
        allowedField("#" + preExposureRows.day3years.prescription);
        allowedField("#" + preExposureRows.day3years.addMedicineBtn);
      } else {
        counterDay3years = false;
        notAllowedField("#" + preExposureRows.day3years.regimen);
        notAllowedField("#" + preExposureRows.day3years.prescription);
        notAllowedField("#" + preExposureRows.day3years.addMedicineBtn);
        $("#" + preExposureRows.day3years.medicineTbody).empty();
      }
    });

  function addMedicine(index, fields) {
    $(`#${fields.addMedicineBtn}`).on("click", function(e) {
      let prescriptionValue = $(`#${fields.prescription}`).val();

      // If no such products
      if (prescriptionValue == null) {
        setErrorWarning(fields.prescription, "No Medicines available");
      } else {
        if (index == "day0") {
          $.ajax({
            type: "GET",
            url: "./php_action/patients_action.php",
            data: {
              checkStocks: 1,
              medicineId: prescriptionValue
            },
            success: function(data) {
              let medicineStocks = JSON.parse(data);

              // If Have products information
              if (medicineStocks.result == "true") {
                let stocksInDatabase = parseInt(medicineStocks.data.quantity);

                //If stocks is zero
                if (stocksInDatabase == 0) {
                  setErrorWarning(fields.prescription, "No available stocks");
                } else {
                  // If have available stocks

                  let id = "";
                  let quantityRow = "";
                  let isFind = false;

                  $(`#${fields.medicineTable} tbody tr`).each(function() {
                    id = $(this)
                      .find("td:nth-child(1)")
                      .html();
                    medicineName = $(this).find("td:nth-child(2)");
                    quantityRow = $(this).find("td:nth-child(3)");

                    if (prescriptionValue == id) {
                      let quantityRowParseInt = parseInt(quantityRow.html());
                      let availableStocks =
                        stocksInDatabase - quantityRowParseInt;

                      if (availableStocks == 0) {
                        setErrorWarning(
                          fields.prescription,
                          "Not enough stocks"
                        );
                      } else {
                        let quantityAddOne = parseInt(quantityRow.html()) + 1;
                        quantityRow.html(quantityAddOne);
                      }

                      isFind = true;
                    }
                  });

                  // If selected medicine is not in the table list
                  if (!isFind) {
                    let medicineInput = `<tr>
                                <td class="d-none">${medicineStocks.data.medicines_id}</td>
                                <td>${medicineStocks.data.name}</td>
                                <td class="text-center">1</td>
                                <td class="text-center"><button type="button" id="${fields.removeRowBtn}" class="btn btn-sm btn-danger">x</button></td>
                              </tr>`;

                    $(`#${fields.medicineTbody}`).append(medicineInput);
                  }
                  isFind = false;
                }
              } else {
                setErrorWarning(fields.prescription, "Not available");
              }
            },
            error: function(jqxhr, status, exception) {
              console.log(xhr + ":" + status + ":" + exception);
            }
          });

          // If Rows is greater than Day0
        } else {
          let id = "";
          let medicineNameRow = "";
          let quantityRow = "";
          let isFind = false;

          $(`#${fields.medicineTable} tbody tr`).each(function() {
            id = $(this)
              .find("td:nth-child(1)")
              .html();
            medicineName = $(this).find("td:nth-child(2)");
            quantityRow = $(this).find("td:nth-child(3)");

            if (prescriptionValue == id) {
              let quantityAddOne = parseInt(quantityRow.html()) + 1;
              quantityRow.html(quantityAddOne);

              isFind = true;
            }
          });

          // If selected medicine is not in the table list
          if (!isFind) {
            let medicineInput = `<tr>
                                <td class="d-none">${prescriptionValue}</td>
                                <td>${$("#" + fields.prescription)
                                  .children("option:selected")
                                  .text()}</td>
                                <td class="text-center">1</td>
                                <td class="text-center"><button type="button" id="${
                                  fields.removeRowBtn
                                }" class="btn btn-sm btn-danger">x</button></td>
                              </tr>`;

            $(`#${fields.medicineTbody}`).append(medicineInput);
          }
          isFind = false;
        }
      }
    });
  }

  /* -------------- Share Both Exposure ------------------ */

  $("#preExposure").hide();

  //Toggle Pre and Post Exposure
  $("#exposureType").on("change", function(e) {
    if (this.value == "postExposure") {
      $("#preExposure").hide("slow");
      $("#postExposure").show("slow");
    } else {
      $("#postExposure").hide("slow");
      $("#preExposure").show("slow");
    }

    defaultDateMoment();
  });

  function defaultDateMoment() {
    $(postDay0).datepicker("update", moment().format("MM-DD-YYYY"));
    initializePostDefaultDate();
    removeMedicineTableLists(postExposureRows);

    $(preDay0).datepicker("update", moment().format("MM-DD-YYYY"));
    initializePreDefaultDate();
    removeMedicineTableLists(preExposureRows);
  }

  function removeMedicineTableLists(exposureRow) {
    $.each(exposureRow, (day, dayValue) => {
      $("#" + dayValue.medicineTbody).empty();
    });
  }

  // Set regiment type on all fields if day0 value change
  function setRegimeType(exposureRow, regimenId) {
    $("#" + regimenId).on("change", function() {
      let day0Value = $(this).val();
      $.each(exposureRow, (index, value) => {
        if (index != "day0") {
          $("#" + value.regimen).val(day0Value);
        }
      });
    });
  }

  function startEndDate(
    date1,
    date2,
    startDateParam,
    startType,
    endDateParam,
    endType
  ) {
    let date1Value = $(date1).val();

    let startDate = moment(date1Value, "MM-DD-YYYY")
      .add(startDateParam, startType)
      .format("MM-DD-YYYY");

    let endDate = moment(startDate, "MM-DD-YYYY")
      .add(endDateParam, endType)
      .format("MM-DD-YYYY");

    $(date2)
      .datepicker("setStartDate", startDate)
      .datepicker("setEndDate", endDate)
      .datepicker("update", startDate);

    // From utilities.js
    removeInstantErrorWarningArray([date1, date2]);
  }

  function allowedField(fieldId) {
    $(fieldId)
      .removeClass("not-allowed")
      .addClass("pointer")
      .prop("disabled", false);
  }

  function notAllowedField(fieldId) {
    $(fieldId)
      .removeClass("pointer")
      .addClass("not-allowed")
      .prop("disabled", true);
  }

  function getMedicinesInTable(exposureObject) {
    let exposureMedicinesData = {};

    $.each(exposureObject, (exposure, exposureValue) => {
      let exposureTablesData = {};
      $.each(exposureValue, (dayIndex, dayValue) => {
        let medicineIdAndQuantity = [];
        let tableRow = $(`#${dayValue.medicineTable} tbody tr`);
        let tableRowError = $(`#${dayValue.medicineTable} tbody tr[id]`);
        if (tableRow.length > 0 && tableRowError.length < 1) {
          $.each(tableRow, function() {
            let medicineId = $(this)
              .find("td:nth-child(1)")
              .html();

            let medicinequantity = $(this)
              .find("td:nth-child(3)")
              .html();

            medicineIdAndQuantity.push({
              id: medicineId,
              quantity: medicinequantity
            });
          });
        } else {
          //Validation in php for empty arrays
        }

        exposureTablesData[dayIndex] = {
          medicineTable: medicineIdAndQuantity,
          medicineTableId: dayValue.medicineTable
        };
      });

      exposureMedicinesData[exposure] = exposureTablesData;
    });

    return exposureMedicinesData;
  }

  // Populate Source List
  function populateSourceList(inputId) {
    $.ajax({
      type: "POST",
      url: "./php_action/patients_action.php",
      data: {
        populateSourceList: 1
      },
      success: function(status) {
        $(inputId).append(status);
      },
      error: function(xhr, status, exception) {
        console.log(xhr + ":" + status + ":" + exception);
      }
    });
  }

  // Populate Type List
  function populateTypeList(inputId) {
    $.ajax({
      type: "POST",
      url: "./php_action/patients_action.php",
      data: {
        populateTypeList: 1
      },
      success: function(status) {
        $(inputId).append(status);
      },
      error: function(xhr, status, exception) {
        console.log(xhr + ":" + status + ":" + exception);
      }
    });
  }

  /* Add Patient Form Submit */
  $("#addPatient").submit(function(event) {
    event.preventDefault();

    let jsonData = JSON.stringify(getMedicinesInTable(exposureRows));
    var currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");

    let formData = new FormData($(this)[0]);
    formData.append("submitPatient", "1");
    formData.append("medicinelist", jsonData);
    formData.append("currentDateTime", currentDateTime);

    $.ajax({
      type: "POST",
      url: "./php_action/patients_action.php",
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: function(data) {
        let responseData = JSON.parse(data);

        // console.log(responseData);

        // If Input field is empty
        if (responseData.status == "failed") {
          $.each(responseData.isEmpty, function(key, value) {
            if (key.includes("Day")) {
              if ($("#" + key + " tbody tr[id]").length < 1) {
                let medicineError = `
                  <tr id="error${key}">
                    <td colspan="3" class="text-center" style="color: red;"><i class="fas fa-exclamation-triangle"></i> ${value}</td>
                  </tr>`;

                $("#" + key + " tbody").append(medicineError);
              }
            } else {
              $("#" + key + ".form-control").css("border", "1px solid red");
              $("#error" + key).html(value);
            }
          });

          if (responseData.tabError == "info") {
            showTab("#nav-info", "210px");
          } else if (responseData.tabError == "treatment") {
            showTab("#nav-treatment", "600px");
          } else {
            // Do Nothing
          }
        } else {
          // If Success registration
          showSuccessModal = true;
          $("#addPatientModal").modal("hide");

          // Reload users table
          patientsTable.ajax.reload();
        }
      },
      error: function(jqxhr, status, exception) {
        // alert("Exception:", exception);
        console.log(xhr + ":" + status + ":" + exception);
      }
    });
  });

  $("#addPatientModal").on("hidden.bs.modal", function(e) {
    // Patient Info
    $("#historycategory").val("");

    inputFields.forEach(function(value) {
      $("#" + value).val("");
      $("#" + value + ".form-control").css("border", "1px solid #ced4da");
      $("#error" + value).html("");

      if (value == "birthdate" || value == "historydate") {
        $("#" + value).datepicker("update", "");
      }
    });

    $("#female").prop("checked", true);

    defaultAddress(); //Default address

    //Treatment Info
    defaultDateMoment();

    counterDay14 = false;
    counterDay28_30 = false;

    counterDay1year = false;
    counterDay3years = false;

    removeSelectedDatePre();
    removeSelectedDatePost();

    $("#postcategory").val("");
    $("#postdate").val("");
    $("#postdate").datepicker("update", "");
    $("#postplace").val("");
    $("#posttype").val("");
    $("#postsource").val("");

    $.each(postExposureRows, (index, value) => {
      $("#" + value.prescription).val(
        $("#" + value.prescription + " option:first").val()
      );
      $("#" + value.prescription + ".form-control").css(
        "border",
        "1px solid #ced4da"
      );
      $("#error" + value.prescription).html("");
    });

    $("#remarksPostExposure").val("");

    $.each(preExposureRows, (index, value) => {
      $("#" + value.prescription).val(
        $("#" + value.prescription + " option:first").val()
      );
      $("#" + value.prescription + ".form-control").css(
        "border",
        "1px solid #ced4da"
      );
      $("#error" + value.prescription).html("");
    });

    $("#remarksPreExposure").val("");

    $("#exposureType").val("postExposure");
    $("#preExposure").hide("slow");
    $("#postExposure").show("slow");

    $(`#nav-tab a[href="#nav-info"]`).tab("show");

    if (showSuccessModal) {
      $("#addPatientSuccessModal").modal("show");
      showSuccessModal = false;
    }
  });

  // From Utilities.js
  removeErrorWarningArray(inputFields);
  removeErrorWarningObject(exposureRows.postExposureRows, "prescription");
  removeErrorWarningObject(exposureRows.postExposureRows, "date");
  removeErrorWarningObject(
    exposureRows.postExposureRows,
    "prescription",
    "emptyMedicine"
  );
  removeErrorWarningObject(
    exposureRows.postExposureRows,
    "addMedicineBtn",
    "emptyMedicine"
  );
  removeErrorWarningObject(exposureRows.preExposureRows, "prescription");
  removeErrorWarningObject(exposureRows.preExposureRows, "date");
  removeErrorWarningObject(
    exposureRows.preExposureRows,
    "prescription",
    "emptyMedicine"
  );
  removeErrorWarningObject(
    exposureRows.preExposureRows,
    "addMedicineBtn",
    "emptyMedicine"
  );

  /*--------------------------------------------------- Edit Patient ------------------------------------------------------*/

  // When Edit Button is clicked, initialized patient data in field
  $("#patientsTable tbody").on("click", "#editPatientBtn", function(e) {
    // event.preventDefault();
    let patientId = patientsTable.row($(this).parents("tr")).data().patients_id;

    $(location).attr("href", `./patients_edit.php?id=${patientId}`);
  });

  /*--------------------------------------------------- Viwe Patient ------------------------------------------------------*/

  // When Edit Button is clicked, initialized patient data in field
  $("#patientsTable tbody").on("click", "#viewPatientBtn", function(e) {
    // event.preventDefault();
    let patientId = patientsTable.row($(this).parents("tr")).data().patients_id;

    $(location).attr("href", `./patients_view.php?id=${patientId}`);
  });
});
