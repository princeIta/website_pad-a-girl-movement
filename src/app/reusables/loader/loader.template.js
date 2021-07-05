export default function ({ size, color }) {
    return ` 
        <div style="display: flex; justify-content: center;">
                <style>
                    @keyframes rotate{
                        from {
                            transform: rotate(0);
                        }
                        to {
                            transform: rotate(360deg);
                        }
                    }
                    .loader{
                        height: ${size};
                        width: ${size};
                        border: 2px solid transparent;
                        border-top: 2px solid ${color || '#F9FBFF'};
                        border-right: 2px solid ${color || '#F9FBFF'};
                        border-radius: 100%;
                        animation: rotate 500ms infinite linear;
                    }
                </Style>
                <div class="loader">
                </div>
        </div>
    `
};
