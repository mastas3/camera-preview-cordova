var app = {
    initialize: function() {
        try {
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        } catch (err) {
            console.log('app.initialize: ' + err)
        }
    },
    onDeviceReady: function() {
        try {
            this.initApp();
        } catch (err) {
            console.log('app.onDeviceReady: ' + err)
        }
    },

    initApp: function() {
        try {
            var options = {
                x: 0,
                y: 0,
                width: window.screen.width,
                height: window.screen.height,
                camera: CameraPreview.CAMERA_DIRECTION.BACK,
                toBack: true,
                tapPhoto: false,
                previewDrag: false
            };

            CameraPreview.startCamera(options);     

            var appContainer = document.getElementById('app');
            appContainer.style.position = 'absolute';
            appContainer.style.top = window.screen.height*0.50 + 'px';

            var thumbnail = document.getElementById('thumbnail');
            thumbnail.style.position = 'absolute';
            thumbnail.style.top = '0px';

            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            canvas.style.position = 'absolute';
            canvas.style.width = window.screen.width;
            canvas.style.height  = window.screen.height;
            canvas.style.top = '0px';            
            canvas.id = 'canvas';
            canvas.className = 'hidden';
            window.ctx = ctx;
            document.body.appendChild(canvas);

            var optionsButton  = document.createElement('BUTTON');
            optionsButton.className = 'options-button';
            optionsButton.onclick = function(_e) {
                try {
                    var optionsMenu = document.createElement('DIV');
                    optionsMenu.className = 'options-menu'
                    document.body.appendChild(optionsMenu);
                } catch (err) {
                    console.log('optionsButton.onclick: ' + err)
                }
            }
            document.body.appendChild(optionsButton);
            
            var buttons = document.getElementById('buttons');
            buttons.style.height = window.screen.height*0.25 + 'px';

            var takePhotoButton = document.createElement('BUTTON');
            takePhotoButton.id = 'take-photo-button';
            takePhotoButton.className = 'take-photo-button';
            buttons.appendChild(takePhotoButton);

            var takePhotoButton = document.getElementById("take-photo-button");
            takePhotoButton.onclick = function(e) {
                CameraPreview.takePicture(function(pic) {
                    var imgSrc ='data:image/jpeg;base64,' + pic;
                    thumbnail.setAttribute('src', imgSrc);
                    thumbnail.onload = function(_e) {
                        canvas.classList.remove('hidden')
                        canvas.className = 'block'
                        ctx.drawImage(thumbnail, 0, 0);
                        CameraPreview.hide();
                    }
                    // thumbnail.className = 'block';
                    // setTimeout(function() {
                    //     CameraPreview.show();
                    //     // thumbnail.className = 'hidden';
                    // }, 2000)
                })
            }

        } catch(err) {
            console.log('app.initApp: ' + err)
        }
    }
};

app.initialize();