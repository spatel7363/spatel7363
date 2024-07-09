<script>
  document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const appointmentDate = document.getElementById('appointmentDate').value;

    gapi.load('client:auth2', initClient);

    function initClient() {
      gapi.client.init({
        apiKey: 'YOUR_API_KEY',
        clientId: 'YOUR_CLIENT_ID',
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: 'https://www.googleapis.com/auth/calendar.events'
      }).then(function () {
        return gapi.auth2.getAuthInstance().signIn();
      }).then(function () {
        var event = {
          'summary': 'Appointment with ' + name,
          'start': {
            'dateTime': appointmentDate,
            'timeZone': 'America/Los_Angeles'
          },
          'end': {
            'dateTime': new Date(new Date(appointmentDate).getTime() + 30 * 60000).toISOString(),
            'timeZone': 'America/Los_Angeles'
          },
          'attendees': [
            {'email': email}
          ],
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10}
            ]
          }
        };

        return gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': event
        });
      }).then(function (response) {
        console.log('Appointment booked: ' + response.result.htmlLink);
        alert('Appointment booked successfully!');
      });
    }
  });
</script>
