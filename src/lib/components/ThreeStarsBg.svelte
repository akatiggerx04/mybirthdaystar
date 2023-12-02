<script>
    // @ts-nocheck
    import * as THREE from 'three';
    import { onMount } from 'svelte';
    import TWEEN from '@tweenjs/tween.js';
    import toast, { Toaster } from 'svelte-french-toast';

    let animateBackground = false;

    function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    onMount(async () => {
        const getRandomParticelPos = (particleCount) => {
            const arr = new Float32Array(particleCount * 3);
            for (let i = 0; i < particleCount; i++) {
                arr[i] = (Math.random() - 0.50) * 20;
            }
            return arr;
        };
        const resizeRendererToDisplaySize = (renderer) => {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
        };

        let mouseX = 0;
        let mouseY = 0;
        document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        });

        const canvas = document.getElementById("three-stars-bg");
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
        renderer.setClearColor(0x000000, 0);
        const scene = new THREE.Scene();

        // camera
        const fov = 75,
            aspect = 10,
            near = 3,
            far = 100;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.z = 2;

        // Geometry
        const geometrys = [new THREE.BufferGeometry(), new THREE.BufferGeometry(), new THREE.BufferGeometry(), new THREE.BufferGeometry(), new THREE.BufferGeometry(), new THREE.BufferGeometry(), new THREE.BufferGeometry()];

        geometrys[0].setAttribute(
            "position",
            new THREE.BufferAttribute(getRandomParticelPos(350), 3)
        );
        geometrys[1].setAttribute(
            "position",
            new THREE.BufferAttribute(getRandomParticelPos(1500), 3)
        );
        geometrys[2].setAttribute(
            "position",
            new THREE.BufferAttribute(getRandomParticelPos(1500), 3)
        );
        geometrys[3].setAttribute(
            "position",
            new THREE.BufferAttribute(getRandomParticelPos(1500), 3)
        );
        geometrys[4].setAttribute(
            "position",
            new THREE.BufferAttribute(getRandomParticelPos(1500), 3)
        );
        geometrys[5].setAttribute(
            "position",
            new THREE.BufferAttribute(getRandomParticelPos(1500), 3)
        );
        geometrys[6].setAttribute(
            "position",
            new THREE.BufferAttribute(getRandomParticelPos(1500), 3)
        );

        const loader = new THREE.TextureLoader();

        const materials = [
            new THREE.PointsMaterial({
            size: randomNumber(0.025, 0.075),
            map: loader.load("/assets/textures/star-dots/o-type.png"),
            transparent: true
            }),
            new THREE.PointsMaterial({
            size: randomNumber(0.025, 0.075),
            map: loader.load("/assets/textures/star-dots/b-type.png"),
            transparent: true
            }),
            new THREE.PointsMaterial({
            size: randomNumber(0.025, 0.075),
            map: loader.load("/assets/textures/star-dots/a-type.png"),
            transparent: true
            }),
            new THREE.PointsMaterial({
            size: randomNumber(0.025, 0.075),
            map: loader.load("/assets/textures/star-dots/f-type.png"),
            transparent: true
            }),
            new THREE.PointsMaterial({
            size: randomNumber(0.025, 0.075),
            map: loader.load("/assets/textures/star-dots/g-type.png"),
            transparent: true
            }),
            new THREE.PointsMaterial({
            size: randomNumber(0.025, 0.075),
            map: loader.load("/assets/textures/star-dots/k-type.png"),
            transparent: true
            }),
            new THREE.PointsMaterial({
            size: randomNumber(0.025, 0.075),
            map: loader.load("/assets/textures/star-dots/m-type.png"),
            transparent: true
            })
        ];

        const starsT1 = new THREE.Points(geometrys[0], materials[0]);
        const starsT2 = new THREE.Points(geometrys[1], materials[1]);
        const starsT3 = new THREE.Points(geometrys[2], materials[2]);
        const starsT4 = new THREE.Points(geometrys[3], materials[3]);
        const starsT5 = new THREE.Points(geometrys[4], materials[4]);
        const starsT6 = new THREE.Points(geometrys[5], materials[5]);
        const starsT7 = new THREE.Points(geometrys[6], materials[6]);
        scene.add(starsT1);
        scene.add(starsT2);
        scene.add(starsT3);
        scene.add(starsT4);
        scene.add(starsT5);
        scene.add(starsT6);
        scene.add(starsT7);

        const cameraStartPosition = { z: 2 };
        const cameraEndPosition = { z: -10 };

        const cameraTween = new TWEEN.Tween(cameraStartPosition)
            .to(cameraEndPosition, 1000) // 1000 milliseconds (1 second)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(() => {
                camera.position.z = cameraStartPosition.z;
            })
            .onComplete(async () => {
                animateBackground = false;
                document.getElementById('three-stars-bg').classList.add("fade-in-stars");
                camera.position.z = 2;
                await new Promise(r => setTimeout(r, 1000));
                document.getElementById('three-stars-bg').classList.remove("fade-in-stars");
            });

        function startCameraMovement() {
            animateBackground = true;
            cameraTween.start();
        }

        const render = (time) => {
            if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            }

            const x_intensity = 0.00005;
            const y_intensity = -0.00005;

            starsT1.position.x = mouseX * x_intensity;
            starsT1.position.y = mouseY * y_intensity;

            starsT2.position.x = mouseX * x_intensity;
            starsT2.position.y = mouseY * y_intensity;

            starsT3.position.x = mouseX * x_intensity;
            starsT3.position.y = mouseY * y_intensity;

            starsT4.position.x = mouseX * x_intensity;
            starsT4.position.y = mouseY * y_intensity;

            starsT5.position.x = mouseX * x_intensity;
            starsT5.position.y = mouseY * y_intensity;

            starsT6.position.x = mouseX * x_intensity;
            starsT6.position.y = mouseY * y_intensity;

            starsT7.position.x = mouseX * x_intensity;
            starsT7.position.y = mouseY * y_intensity;
            
            renderer.render(scene, camera);

            if (animateBackground) {
                renderer.render(scene, camera);
                TWEEN.update();
            }

            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);

        window.addEventListener("message", async (event) => {
            if (event.data.MovingThroughSpace == true) {
                startCameraMovement();
            }
        });

        renderer.domElement.addEventListener('webglcontextlost', function(event) {
                console.error('WebGL context lost');
                document.getElementById("three-stars-bg").remove();
                    toast.error("WebGL Context Lost, Please reload the website.", {
                        style: 'border: 1px solid #FFFFFF; padding: 16px; color: #FFFFFF; background-color: transparent;',
                        iconTheme: {
                            primary: '#FFFFFF',
                            secondary: '#000000'
                        }
                    });
        });
    });
</script>

<div class="bg-[url('/assets/img/static-bg.jpg')] bg-no-repeat bg-cover h-full w-full bg-center">
    <canvas id="three-stars-bg" class="h-full w-full md:lg:block hidden" oncontextmenu="return false;"></canvas>
</div>

<Toaster />

<style>
    :global(.fade-in-stars) {
        opacity: 0;
        animation: fadeIn 0.5s ease-in-out forwards;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>
