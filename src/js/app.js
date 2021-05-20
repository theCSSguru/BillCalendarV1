// jQuery
$(document).ready(function(){

  // Bootstrap 4 Tooltip
  $('[data-toggle="tooltip"]').tooltip();

  // (Replace with ColdFusion) Finds todays date and adds todays class to the current day
  var today = moment().toDate();
  var todayFormat = moment(today).format('MM/DD/YY');
  $('.bc-calendar-day[data-date="'+todayFormat+'"').addClass('bc-calendar-day-today');

  // Close Parent
  $('.bc-mobile-list-close').on('click',function(){
    $(this).parent().parent().addClass('hidden');
    // Remove selected day if selected
    $('.bc-calendar-day').removeClass('bc-mobile-day-selected');
  });

  // Mobile Only (768px and below)
  $(window).on('resize',function(){
    if ($(window).outerWidth() <= 768) {
      // Cover the day on the calendar to prevent unwanted taps
      if (!$('.bc-calendar-day .bc-calendar-day-mobile-cover').length) {
        $('.bc-calendar-day').append(`<div class="bc-calendar-day-mobile-cover"></div>`);
      }
      // Tap on Calendar Day to see the events in list view
      $('.bc-calendar-day').on('click',function(){
        // Grab the current days date
        var dayDate = $(this).data('date');
        var formatDate = moment(dayDate).format('dddd, MMMM Do YYYY');
        $('.bc-mobile-list-date').text(formatDate);
        // Remove selected border from all days
        $('.bc-calendar-day').removeClass('bc-mobile-day-selected');
        // Add selected border to tapped day
        $(this).addClass('bc-mobile-day-selected');
        // Find Events of tapped day
        var dayEvents = $(this).find('.bc-calendar-day-events').html();
        // Empty out the mobile list events
        $('.bc-mobile-list-items').html('');
        // Populate the list with events from tapped day
        $('.bc-mobile-list-items').html(dayEvents);
        $('.bc-mobile-list-items').attr('data',dayDate);
        // Income from tapped day, then add it to the list at the top
        var dayIncome = $(this).find('.bc-calendar-day-income-wrap').html();
        $('.bc-mobile-list-items').prepend(dayIncome);
        // Show the list if there's something in there
        $('.bc-mobile-list-items').parent().removeClass('hidden');
      });
      // Invoke the Add Event Modal from the Mobile List Add Button
      $('.bc-mobile-list-add').on('click',function(){
        // Hide the current Mobile List
        $('.bc-mobile-list').addClass('hidden');
      });
    } else {
      // Remove the day cover for desktop
      $('.bc-calendar-day-mobile-cover').remove();
    }
  }).resize();

});