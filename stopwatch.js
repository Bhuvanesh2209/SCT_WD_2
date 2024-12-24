let startTime = 0;
        let elapsedTime = 0;
        let timerInterval;
        let isRunning = false;

        const timeDisplay = document.getElementById('timeDisplay');
        const startPauseButton = document.getElementById('startPauseButton');
        const resetButton = document.getElementById('resetButton');
        const lapButton = document.getElementById('lapButton');
        const lapTimesList = document.getElementById('lapTimes').querySelector('ul');
        const liveDateTime = document.getElementById('liveDateTime');

        function formatTime(ms) {
            const date = new Date(ms);
            const minutes = String(date.getUTCMinutes()).padStart(2, '0');
            const seconds = String(date.getUTCSeconds()).padStart(2, '0');
            const milliseconds = String(date.getMilliseconds()).padStart(3, '0').slice(0, 2);
            return `${minutes}:${seconds}.${milliseconds}`;
        }

        function updateTimeDisplay() {
            elapsedTime = Date.now() - startTime;
            timeDisplay.textContent = formatTime(elapsedTime);
        }

        function updateLiveDateTime() {
            const now = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
            liveDateTime.textContent = now.toLocaleDateString('en-US', options);
        }

        function startPauseStopwatch() {
            if (isRunning) {
                clearInterval(timerInterval);
                elapsedTime += Date.now() - startTime;
                startPauseButton.textContent = 'Start';
            } else {
                startTime = Date.now() - elapsedTime;
                timerInterval = setInterval(updateTimeDisplay, 10);
                startPauseButton.textContent = 'Pause';
            }
            isRunning = !isRunning;
        }

        function resetStopwatch() {
            clearInterval(timerInterval);
            startTime = 0;
            elapsedTime = 0;
            isRunning = false;
            timeDisplay.textContent = '00:00:00.00';
            startPauseButton.textContent = 'Start';
            lapTimesList.innerHTML = '';
        }

        function recordLap() {
            if (!isRunning) return;
            const lapTime = document.createElement('li');
            lapTime.textContent = formatTime(elapsedTime);
            lapTimesList.appendChild(lapTime);
        }

        startPauseButton.addEventListener('click', startPauseStopwatch);
        resetButton.addEventListener('click', resetStopwatch);
        lapButton.addEventListener('click', recordLap);

        setInterval(updateLiveDateTime, 1000);