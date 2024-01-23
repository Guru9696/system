$(function () {
  $('[data-toggle="tooltip"]').tooltip({ placement: "bottom" });
});
let url = window.location.href;
let certificateId = url
  .substring(url.indexOf("verified/") + 8)
  .trim()
  .slice(1);
let currentUrl = window.location.href;

$.ajax({
  type: "GET",
  url: config.baseUrl + "/public1/certificate-details/" + certificateId,
  dataType: "json",
  success: function (data) {
    // top main data
    $("#issued_to").html(data.Name);
    $("#issue_by").html(
      data.hasOwnProperty("issuer_company_name")
        ? data.issuer_company_name
        : data.issuer_name
    );
    if (data.issue_date) {
      $("#issued_on").html(data.issue_date);
      $("#date").show();
    } else {
      $("#date").hide();
    }

    // if (data.expiry_date) {
    //   $("#expiry").html(data.expiry_date);
    //   $("#date_of_expiry").show();
    // } else {
    //   $("#date_of_expiry").hide();
    // }
    $("#date_of_expiry").hide();
    // issuer details
    $("#issue_by1").html(
      data.hasOwnProperty("issuer_company_name")
        ? data.issuer_company_name
        : data.issuer_name
    );
    if (data.hasOwnProperty("issuer_company_description")) {
      $("#issuer_description").html(data.issuer_company_description);
      $("#issuer_description").show();
    } else {
      $("#issuer_description").hide();
    }

    if (data.hasOwnProperty("company_linkedin_page")) {
      $("#issuer_linkedin").attr("href", data.company_linkedin_page);
      $("#issuer_linkedin").show();
    } else {
      $("#issuer_linkedin").hide();
    }

    if (data.hasOwnProperty("company_twitter_page")) {
      $("#issuer_twitter").attr("href", data.company_twitter_page);
      $("#issuer_twitter").show();
    } else {
      $("#issuer_twitter").hide();
    }

    if (data.hasOwnProperty("company_facebook_page")) {
      $("#issuer_facebook").attr("href", data.company_facebook_page);
      $("#issuer_facebook").show();
    } else {
      $("#issuer_facebook").hide();
    }

    if (data.hasOwnProperty("issuer_website")) {
      $("#issuer_website").attr("href", data.issuer_website);
      $("#issuer_website").show();
    } else {
      $("#issuer_website").hide();
    }

    // Earning Criteria
    
    // certificate display name
    if(data.certificate_template_display_name) {
      $("#certificate_template_display_name").html(data.certificate_template_display_name);
    } else {
      $("#earning_criteria_title").hide();
    }

    // certificate criteria
    if (data.certificate_criteria) {
      var certificateCriteria = data.certificate_criteria;
      if (certificateCriteria.indexOf(',') !== -1) {
        var certificateCriteriaArray = certificateCriteria.split(",");
        $.each(certificateCriteriaArray, function (key, value) {
          $("#certificate_criteria").append(
            '<div class="col-2 col-md-1 hand-badge-container__pointer-col"><img src="assests/img/pointer.png" alt="poninter" class="hand-badge__img-pointer"></div>',
            '<div class="col-10 col-md-11 hand-badge-container__txt-col"><p>' +
              value +
              "</p></div>"
          );
        });
      } else {
        $("#certificate_criteria").append(
          '<div class="col-2 col-md-1 hand-badge-container__pointer-col"><img src="assests/img/pointer.png" alt="poninter" class="hand-badge__img-pointer"></div>',
          '<div class="col-10 col-md-11 hand-badge-container__txt-col"><p>' +
          certificateCriteria +
            "</p></div>"
        );
      }
    } else {
      $("#certificate_criteria").hide();
      $(".hand-badge-container__isuer-row").css("margin", "auto");
    }

    // recipient skills
    if (data.recipient_skills) {
      var recipientSkills = data.recipient_skills;
      if (recipientSkills.indexOf(',') !== -1) {
        var recipientSkillsArray = recipientSkills.split(",");
        $.each(recipientSkillsArray, function (key, value) {
          $("#recipient_skills").append(
            '<div class="p-2 bd-highlight hand-badge-container__btn">' +
              value +
              "</div>"
          );
        });
      } else {
        $("#recipient_skills").append(
          '<div class="p-2 bd-highlight hand-badge-container__btn">' +
          recipientSkills +
            "</div>"
        );
      }
    } else {
      $("#skills_listing").hide();
      $(".hand-badge-container__isuer-row").css("margin", "auto");
    }


    // shareUrls
    let certificateURL = data.publishedURL ? data.publishedURL :
      `https://truecertificates.com/secure/snapshot/${data.CertificateNumber}` +
      ".png";
    $("#linkedin_share_url").attr(
      "href",
      `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`
    );
    $("#twitter_share_url").attr(
      "href",
      `https://twitter.com/share?url=${currentUrl}&text=${data.CertificateNumber}`
    );
    $("#facebook_share_url").attr(
      "href",
      `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`
    );
    $("#whatsapp_share_url").attr("href", `https://wa.me/?text=${currentUrl}`);
    $("#img_url").attr("href", certificateURL);
    $(".certificate__image").html(
      `<img id="certificate_image" src="${certificateURL}" alt="award" class="banner__award-img">`
    );
    $("#download_share_url").attr("href", certificateURL);

    var $temp = $("<input>");
    $("#website_share_url").on("click", function (e) {
      $("#website_share_url").attr("title", "Copied!!");
      $("#website_share_url").attr("data-bs-original-title", "Copied!!");
      $("#website_share_url").attr("aria-label", "Copied!!");
      e.preventDefault(); //stop the browser from following
      $("body").append($temp);
      $temp.val(currentUrl).select();
      document.execCommand("copy");
      $temp.remove();
    });
  },
  error: function (reject, ajaxOptions, thrownError) {
    if (reject.status === 403 || reject.status === 404) {
      location.href = "https://truecertificates.com/";
    }
  },
  timeout: 15000, //timeout of the ajax call
});
