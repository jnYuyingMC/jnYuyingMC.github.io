/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var vrView;

// All the scenes for the experience
var scenes = {
  garden: {
    image: 'garden.webp',
    preview: 'garden-preview.webp',
    hotspots: {
      playground: {
        pitch: -3,
        yaw: 10,
        radius: 0.1,
        distance: 3
      },
      hall: {
        pitch: 14,
        yaw: -45,
        radius: 0.1,
        distance: 3
      }
    }
  },
  playground: {
    image: 'playground.webp',
    preview: 'playground-preview.webp',
    hotspots: {
      garden: {
        pitch: 0,
        yaw: -170,
        radius: 0.1,
        distance: 3
      },
      gym: {
        pitch: -12,
        yaw: -100,
        radius: 0.1,
        distance: 3
      },
      hall: {
        pitch: 13,
        yaw: -120,
        radius: 0.1,
        distance: 3
      },
      statue: {
        pitch: -15,
        yaw: -70,
        radius: 0.1,
        distance: 3
      }
    }
  },
  gym: {
    image: 'gym.webp',
    preview: 'gym-preview.webp',
    hotspots: {
      playground: {
        pitch: -5,
        yaw: 100,
        radius: 0.1,
        distance: 3
      }
    }
  },
  hall: {
    image: 'hall.webp',
    preview: 'hall-preview.webp',
    hotspots: {
      garden: {
        pitch: 2,
        yaw: -120,
        radius: 0.1,
        distance: 3
      },
      playground: {
        pitch: 2,
        yaw: 120,
        radius: 0.1,
        distance: 3
      },
      statue: {
        pitch: 2,
        yaw: 100,
        radius: 0.1,
        distance: 3
      }
    }
  },
  statue: {
    image: 'statue.webp',
    preview: 'statue-preview.webp',
    hotspots: {
      hall: {
        pitch: 29,
        yaw: 20,
        radius: 0.1,
        distance: 3
      },
      playground: {
        pitch: 13,
        yaw: -75,
        radius: 0.1,
        distance: 3
      },
      gym: {
        pitch: 0,
        yaw: 28,
        radius: 0.1,
        distance: 3
      },
      top: {
        pitch: 26,
        yaw: -175,
        radius: 0.1,
        distance: 3
      }
    }
  },
  top: {
    image: 'top.webp',
    preview: 'top-preview.webp',
    hotspots: {
      statue: {
        pitch: -30,
        yaw: -90,
        radius: 0.1,
        distance: 3
      },
      gym: {
        pitch: -16,
        yaw: -78,
        radius: 0.1,
        distance: 3
      },
      hall: {
        pitch: 8,
        yaw: -78,
        radius: 0.1,
        distance: 3
      }
    }
  }
};

function onLoad() {
  vrView = new VRView.Player('#vrview', {
    image: 'blank.png',
    preview: 'blank.png',
    width: "100%",
    is_stereo: true,
    is_autopan_off: true
  });

  vrView.on('ready', onVRViewReady);
  vrView.on('modechange', onModeChange);
  vrView.on('click', onHotspotClick);
  vrView.on('error', onVRViewError);
  vrView.on('getposition', onGetPosition);
}

function onVRViewReady(e) {
  console.log('onVRViewReady');
  loadScene('garden');
}

function onModeChange(e) {
  console.log('onModeChange', e.mode);
}

function onGetPosition(e) {
  console.log(e);

}

function onHotspotClick(e) {
  vrView.getPosition()
  console.log('onHotspotClick', e.id);
  if (e.id) {
    loadScene(e.id);
  }
}

function loadScene(id) {
  console.log('loadScene', id);

  // Set the image
  vrView.setContent({
    image: scenes[id].image,
    preview: scenes[id].preview,
    is_stereo: true,
    is_autopan_off: true
  });

  // Add all the hotspots for the scene
  var newScene = scenes[id];
  var sceneHotspots = Object.keys(newScene.hotspots);
  for (var i = 0; i < sceneHotspots.length; i++) {
    var hotspotKey = sceneHotspots[i];
    var hotspot = newScene.hotspots[hotspotKey];

    vrView.addHotspot(hotspotKey, {
      pitch: hotspot.pitch,
      yaw: hotspot.yaw,
      radius: hotspot.radius,
      distance: hotspot.distance
    });
  }
}

function onVRViewError(e) {
  console.log('Error! %s', e.message);
}

window.addEventListener('load', onLoad);
