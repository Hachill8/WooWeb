// Restricts input for each element in the set of matched elements to the given inputFilter.
(function($) {
  $.fn.inputFilter = function(inputFilter) {
    return this.on(
      "input keydown keyup mousedown mouseup select contextmenu drop",
      function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        }
      }
    );
  };
})(jQuery);

/* filter Value */
let filterString = {
  names: /^[a-zA-Z\s]*$/,
  fullname: /^[a-zA-Z\s]*\.?[a-zA-Z\s]*$/,
  address: /^[a-zA-Z0-9\s,.'-]*$/,
  contact: /^\d*$/,
  contact2: /^([0-9]*-){0,2}[0-9]*$/,
  age: /^\d*$/,
  weight: /^[0-9]*\.?[0-9]*$/,
  landline: /^[0-9]*\-?[0-9]*$/,
  landline2: /^([0-9]*-){0,2}[0-9]*$/,
  names2: /^[a-zA-Z0-9\s,.-]*$/
};

/* Single Input Field */
function filterField(id, filter) {
  if (filterString.hasOwnProperty(filter)) {
    $("#" + id).inputFilter(function(value) {
      if (filter == "contact") {
        return filterString[filter].test(value) && value.length <= 11;
      } else if (filter == "contact2") {
        return filterString[filter].test(value) && value.length <= 13;
      } else if (filter == "landline") {
        return filterString[filter].test(value) && value.length <= 9;
      } else if (filter == "landline2") {
        return filterString[filter].test(value) && value.length <= 10;
      } else if (filter == "weight") {
        return filterString[filter].test(value) && value.length <= 6;
      } else if (filter == "age") {
        return filterString[filter].test(value) && value.length <= 3;
      } else {
        return filterString[filter].test(value);
      }
    });
  } else {
    console.log(
      "No filterString property of: " +
        filter +
        " in id of" +
        id +
        ". Incorrect Filter name"
    );
  }
}

/* Multiple Input Field */
function filterFieldObject(inputFields) {
  $.each(inputFields, (index, valueField) => {
    if (valueField.filter == undefined) {
      return;
    } else if (!filterString.hasOwnProperty(valueField.filter)) {
      console.log(
        "No filterString property of: " +
          valueField.filter +
          " in id of" +
          index +
          ". Incorrect Filter name"
      );
    } else {
      $("#" + index).inputFilter(function(value) {
        if (valueField.filter == "contact") {
          return (
            filterString[valueField.filter].test(value) && value.length <= 11
          );
        } else if (valueField.filter == "contact2") {
          return (
            filterString[valueField.filter].test(value) && value.length <= 13
          );
        } else if (valueField.filter == "landline") {
          return (
            filterString[valueField.filter].test(value) && value.length <= 9
          );
        } else if (valueField.filter == "landline2") {
          return (
            filterString[valueField.filter].test(value) && value.length <= 10
          );
        } else if (valueField.filter == "weight") {
          return (
            filterString[valueField.filter].test(value) && value.length <= 6
          );
        } else if (valueField.filter == "age") {
          return (
            filterString[valueField.filter].test(value) && value.length <= 3
          );
        } else {
          return filterString[valueField.filter].test(value);
        }
      });
    }
  });
}

/*---------------------------------------------------------------------------------------------------*/

// Get age based on user birthday
function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

/*----------------------Remove error warning when inputs click and keypress events----------------------------*/
function removeInstantErrorWarningArray(idArray) {
  idArray.forEach(function(value) {
    $(value + ".form-control").css("border", "1px solid #ced4da");
    let extractedHash = value.replace("#", "");
    $("#error" + extractedHash).html("");
  });
}

/* Accepts Array Parameters */
function removeErrorWarningArray(inputFields) {
  inputFields.forEach(function(value) {
    $("#" + value).on("click keypress", function(event) {
      $("#" + value + ".form-control").css("border", "1px solid #ced4da");
      $("#error" + value).html("");
    });
  });
}

/* Accepts Object Parameters */
function removeErrorWarningObject(inputFields, field, emptyMedicine) {
  $.each(inputFields, (index, value) => {
    $("#" + value[field]).on("click keypress", function(event) {
      switch (emptyMedicine) {
        case "emptyMedicine":
          $(
            "#" +
              value.medicineTable +
              " tbody" +
              " #error" +
              value.medicineTable
          ).remove();
          break;
        default:
          $("#" + value[field] + ".form-control").css(
            "border",
            "1px solid #ced4da"
          );
          $("#error" + value[field]).html("");
      }
    });
  });
}

/*---------------------------------------------------------------------------------------------------*/
/* Set Error Warning */
function setErrorWarning(fieldId, errorMessage) {
  $("#" + fieldId + ".form-control").css("border", "1px solid red");
  $("#error" + fieldId).html(errorMessage);
}

/* Set Error Warning All Selector*/
function setErrorWarningAll(field, errorMessage) {
  $(field).css("border", "1px solid red");
  $(".error" + field).html(errorMessage);
}

/*---------------------------------------------------------------------------------------------------*/
/* Set Dates */
function setDate(dateId, startendOptions) {
  switch (startendOptions) {
    case "start":
      $(`#${dateId}`).datepicker({
        format: "mm-dd-yyyy",
        autoclose: true,
        startDate: "0d"
      });
      break;
    case "end":
      $(`#${dateId}`).datepicker({
        format: "mm-dd-yyyy",
        autoclose: true,
        endDate: "0d"
      });
      break;
    case "both":
      $(`#${dateId}`).datepicker({
        format: "mm-dd-yyyy",
        autoclose: true
      });
      break;
    default:
      console.log("Invalid Start end Options, check for spelling");
  }
}

/* Set Dates Objects*/
function setDateObject(dateObject, startendOptions) {
  switch (startendOptions) {
    case "start":
      $(dateObject).datepicker({
        format: "mm-dd-yyyy",
        autoclose: true,
        startDate: "0d"
      });
      break;
    case "end":
      $(dateObject).datepicker({
        format: "mm-dd-yyyy",
        autoclose: true,
        endDate: "0d"
      });
      break;
    case "both":
      $(dateObject).datepicker({
        format: "mm-dd-yyyy",
        autoclose: true
      });
      break;
    default:
      console.log("Invalid Start end Options, check for spelling");
  }
}

function setDateDashFormatNoStartAndEndDate(dateElement, dateValue) {
  $(dateElement)
    .datepicker({
      format: "mm/dd/yyyy",
      autoclose: true
    })
    .datepicker("update", dateValue);
}

/* SET START END DATE */
function startEndDateUtil(
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

  $(date2).datepicker({
    format: "mm-dd-yyyy",
    autoclose: true
  });

  $(date2)
    .datepicker("setStartDate", startDate)
    .datepicker("setEndDate", endDate)
    .datepicker("update", startDate);
}

function startEndDateUtilDefault(
  date1,
  date2,
  startDateParam,
  startType,
  endDateParam,
  endType
) {
  let date1Value = $(date1).val();

  if (date1Value == "") {
    let endDate = moment($(date2).val(), "MM-DD-YYYY")
      .add(endDateParam, endType)
      .format("MM-DD-YYYY");

    $(date1).datepicker({
      format: "mm-dd-yyyy",
      autoclose: true
    });

    $(date2).datepicker({
      format: "mm-dd-yyyy",
      autoclose: true
    });

    $(date2)
      .datepicker("setStartDate", $(date2).val())
      .datepicker("setEndDate", endDate)
      .datepicker("update", $(date2).val());
  } else {
    let startDate = moment(date1Value, "MM-DD-YYYY")
      .add(startDateParam, startType)
      .format("MM-DD-YYYY");

    let endDate = moment(startDate, "MM-DD-YYYY")
      .add(endDateParam, endType)
      .format("MM-DD-YYYY");

    $(date2).datepicker({
      format: "mm-dd-yyyy",
      autoclose: true
    });

    $(date2)
      .datepicker("setStartDate", startDate)
      .datepicker("setEndDate", endDate)
      .datepicker("update", $(date2).val());
  }
}

/*----------------------------------------- Medicines Section ------------------------------------------------*/
// Remove medicine row
function removeMedicineRow(fields) {
  $(`#${fields.medicineTable}`).on("click", `#${fields.removeRowBtn}`, function(
    event
  ) {
    $(this)
      .closest("tr")
      .remove();
  });
}

// Initialize Medicines Lists
function initializeMedicines(prescriptionId) {
  $.ajax({
    type: "GET",
    url: "./php_action/patients_action.php",
    data: {
      populateMedicinesLists: 1
    },
    success: function(data) {
      let medicinesData = JSON.parse(data);

      let medicinesValue = "";

      $.each(medicinesData, (index, value) => {
        medicinesValue += `<option value="${value.medicines_id}">${value.name}</option><br>`;
      });

      $(`#${prescriptionId}`).append(medicinesValue);
    },
    error: function(jqxhr, status, exception) {
      console.log(xhr + ":" + status + ":" + exception);
    }
  });
}

/* ---------------- ADDRESS REGION, PROVINCE, MUNICIPALITY/CITY, & BARANGGAY----------------------- */

// Initialize Region Lists Default
function initializeAllRegion(regionId, selectedCode = "none") {
  $.ajax({
    type: "GET",
    url: "./php_action/address_action.php",
    data: {
      populateAllRegion: 1,
      selectedCode: selectedCode
    },
    success: function(regionData) {
      $(regionId).append(regionData);
    },
    error: function(xhr, status, exception) {
      console.log(xhr + ":" + status + ":" + exception);
    }
  });
}

// Initialize Province by Region id
function initializeProvince(regionValue, provinceId, selectedCode = "none") {
  $.ajax({
    type: "GET",
    url: "./php_action/address_action.php",
    data: {
      populateProvinceByRegion: 1,
      regionValue: regionValue,
      selectedCode: selectedCode
    },
    success: function(provinceData) {
      $(provinceId).empty();
      $(provinceId).append(provinceData);
    },
    error: function(xhr, status, exception) {
      console.log(xhr + ":" + status + ":" + exception);
    }
  });
}

// Initialize City/Municipality By Province Id
function initializeCityMunicipality(
  provinceValue,
  cityMunicipalityId,
  selectedCode = "none"
) {
  $.ajax({
    type: "GET",
    url: "./php_action/address_action.php",
    data: {
      populateCityMunicipalityByProvince: 1,
      provinceValue: provinceValue,
      selectedCode: selectedCode
    },
    success: function(cityMunicipalityData) {
      $(cityMunicipalityId).empty();
      $(cityMunicipalityId).append(cityMunicipalityData);
    },
    error: function(xhr, status, exception) {
      console.log(xhr + ":" + status + ":" + exception);
    }
  });
}

// Initialize Baranggay by City/Municipality Id
function initializeBaranggay(
  cityMunicipalityValue,
  baranggayId,
  selectedCode = "none"
) {
  $.ajax({
    type: "GET",
    url: "./php_action/address_action.php",
    data: {
      populateBaranggay: 1,
      cityMunicipalityValue: cityMunicipalityValue,
      selectedCode: selectedCode
    },
    success: function(baranggayData) {
      $(baranggayId).empty();
      $(baranggayId).append(baranggayData);
    },
    error: function(xhr, status, exception) {
      console.log(xhr + ":" + status + ":" + exception);
    }
  });
}

// Select Address description
function populateAddressDescription(addressIdAndCode) {
  $.ajax({
    type: "GET",
    url: "./php_action/address_action.php",
    data: {
      populateAddressDescription: 1,
      regionCode: addressIdAndCode.region.code,
      provinceCode: addressIdAndCode.province.code,
      citymunCode: addressIdAndCode.citymunicipality.code,
      baranggayCode: addressIdAndCode.baranggay.code
    },
    success: function(addressDescriptionJson) {
      let addressDescriptionData = JSON.parse(addressDescriptionJson);

      //Populate into inputs field
      $(addressIdAndCode.region.id).val(
        addressDescriptionData.regionDescription
      );
      $(addressIdAndCode.province.id).val(
        addressDescriptionData.provinceDescription
      );
      $(addressIdAndCode.citymunicipality.id).val(
        addressDescriptionData.citymunicipalityDescription
      );
      $(addressIdAndCode.baranggay.id).val(
        addressDescriptionData.baranggayDescription
      );
    },
    error: function(xhr, status, exception) {
      console.log(xhr + ":" + status + ":" + exception);
    }
  });
}
