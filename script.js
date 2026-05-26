// ==========================================
// ALPINE.JS COMPONENTS LOGIC (Terminal & Monitor)
// ==========================================

// AlpineJS logic untuk Terminal Pengetikan Interaktif
function terminalHandler() {
    return {
        inputCmd: '',
        history: [],
        submitCommand() {
            const cmd = this.inputCmd.trim().toLowerCase();
            if (!cmd) return;

            let output = '';
            switch(cmd) {
                case 'help':
                    output = `Daftar perintah yang tersedia:\n  <span class="text-emerald-400">about</span>    - Mengenal profil ringkas saya\n  <span class="text-emerald-400">skills</span>   - Menampilkan rack keahlian teknis\n  <span class="text-emerald-400">clear</span>    - Membersihkan layar konsol`;
                    break;
                case 'about':
                    output = "Saya Zakaria Ramadan, seorang System Administrator & DevOps Engineer yang fokus merancang infrastruktur sistem dengan tingkat ketersediaan tinggi (High Availability) dan arsitektur cloud terotomatisasi.";
                    break;
                case 'skills':
                    output = "Core Stack:\n - OS: Ubuntu Server, RHEL, Rocky Linux\n - Cloud/Virt: AWS, Docker, Kubernetes, Proxmox\n - IaC/Automation: Terraform, Ansible, Bash Scripting\n - Telemetri: Prometheus, Grafana, Nginx Logs";
                    break;
                case 'clear':
                    this.history = [];
                    this.inputCmd = '';
                    return;
// --- EASTER EGG RM COMMAND ---
                case 'rm':
                    output = `<span class="text-yellow-400">rm: missing operation. Coba jalankan <span class="font-bold text-rose-500">rm -rf /</span> kalau Anda berani 😈</span>`;
                    break;
                case 'rm -rf /':
                case 'sudo rm -rf /':
                    output = `<span class="text-rose-500 font-bold animate-pulse">[CRITICAL WARNING] Menghapus sistem root... Good bye!</span>`;
                    
                    // Efek Animasi Menghilang (Website rontok)
                    setTimeout(() => {
                        document.body.style.transition = "all 2s ease-in-out";
                        document.body.style.transform = "scale(0.01) rotate(15deg) translateY(500px)";
                        document.body.style.opacity = "0";
                        document.body.style.backgroundColor = "#9f1239"; // Warna merah error
                        
                        // Kembalikan seperti semula setelah hilang
                        setTimeout(() => {
                            alert("err.404.\n\npage not found 💀\nRebooting system...");
                            
                            // Reset style CSS
                            document.body.style.transition = "all 1s ease-in-out";
                            document.body.style.transform = "scale(1) rotate(0deg) translateY(0)";
                            document.body.style.opacity = "1";
                            document.body.style.backgroundColor = ""; 
                            
                            // Bersihkan terminal setelah "reboot"
                            this.history = [{ 
                                cmd: 'reboot', 
                                output: '<span class="text-emerald-400">System successfully recovered. Welcome back! Tolong jangan dihapus lagi ya 🙏</span>' 
                            }];
                            
                            // Auto scroll ke bawah
                            this.$nextTick(() => {
                                const screen = this.$refs.terminalScreen;
                                screen.scrollTop = screen.scrollHeight;
                            });
                        }, 2500);
                    }, 1000);
                    break;
                // -----------------------------
                default:
                    output = `bash: command not found: \`${cmd}\`. Ketik <span class="text-emerald-400">help</span> untuk bantuan opsi command.`;
            }
            

            this.history.push({ cmd: this.inputCmd, output: output });
            this.inputCmd = '';
            
            // Auto scroll terminal ke posisi paling bawah
            this.$nextTick(() => {
                const screen = this.$refs.terminalScreen;
                screen.scrollTop = screen.scrollHeight;
            });
        }
    }
}

// AlpineJS logic untuk Real-time Metric Monitoring (Simulasi Dinamis)
function systemMonitor() {
    return {
        cpu: 42,
        ram: 58,
        init() {
            setInterval(() => {
                this.cpu = Math.floor(Math.random() * (65 - 25) + 25);
                this.ram = Math.floor(Math.random() * (68 - 55) + 55);
            }, 3000);
        }
    }
}

// ==========================================
// NATIVE JAVASCRIPT: MEDIUM RSS FEED FETCH
// ==========================================

// JavaScript Native untuk mengambil Live RSS Feed Medium
document.addEventListener("DOMContentLoaded", function() {
    const MEDIUM_USERNAME = "@zakariaramadan"; // Username Medium Anda
    const rssUrl = `https://medium.com/feed/${MEDIUM_USERNAME}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    const container = document.getElementById("medium-blog-container");

    if (!container) return; // Mencegah error jika elemen tidak ditemukan di halaman

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.status === "ok" && data.items.length > 0) {
                container.innerHTML = ""; // Hapus elemen loading text

                // Ambil maksimal 3 artikel paling terbaru
                const latestPosts = data.items.slice(0, 3);

                latestPosts.forEach(post => {
                    // Gunakan gambar bawaan artikel, atau fallback ke tema cyber/matrix gratis jika kosong
                    const thumbnail = post.thumbnail || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600';
                    
                    // Format Waktu Publikasi
                    const pubDate = new Date(post.pubDate).toLocaleDateString('id-ID', {
                        year: 'numeric', month: 'short', day: 'numeric'
                    });

                    // Bersihkan tag HTML dari cuplikan konten tulisan
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = post.description;
                    const textContent = tempDiv.textContent || tempDiv.innerText || "";
                    const shortSnippet = textContent.substring(0, 115) + "...";

                    // Inject struktur HTML Card dinamis
                    const cardHtml = `
                        <article class="bg-slate-900/30 border border-slate-800/80 rounded-2xl overflow-hidden group hover:border-emerald-500/20 transition-all duration-300 flex flex-col h-full">
                            <div class="h-44 bg-slate-950 overflow-hidden relative border-b border-slate-900">
                                <img src="${thumbnail}" alt="${post.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80 group-hover:opacity-100">
                            </div>
                            <div class="p-6 flex-grow flex flex-col justify-between">
                                <div>
                                    <div class="flex items-center space-x-2 text-xs text-slate-500 font-mono mb-4">
                                        <span><i class="fa-regular fa-calendar mr-1"></i> ${pubDate}</span>
                                        <span>•</span>
                                        <span>Live Feed</span>
                                    </div>
                                    <h3 class="text-lg font-display font-bold text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-2">
                                        ${post.title}
                                    </h3>
                                    <p class="text-slate-400 text-xs leading-relaxed mt-3 line-clamp-3 font-sans">
                                        ${shortSnippet}
                                    </p>
                                </div>
                                <div class="border-t border-slate-800/80 pt-4 mt-6 flex justify-between items-center">
                                    <span class="text-xs font-mono text-emerald-400/70">#Sysadmin</span>
                                    <a href="${post.link}" target="_blank" class="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1 font-mono">
                                        Baca Artikel <i class="fa-solid fa-arrow-up-right-from-square text-[10px] ml-0.5"></i>
                                    </a>
                                </div>
                            </div>
                        </article>
                    `;
                    container.innerHTML += cardHtml;
                });
            } else {
                container.innerHTML = `<div class="col-span-3 text-center text-sm font-mono text-rose-400 py-10">[ERROR] Gagal memuat data RSS Feed atau tidak ada artikel publik yang ditemukan.</div>`;
            }
        })
        .catch(error => {
            console.error("Gagal melakukan fetch RSS:", error);
            container.innerHTML = `<div class="col-span-3 text-center text-sm font-mono text-rose-400 py-10">[CRITICAL_ERR] Gagal terhubung ke gateway RSS Medium API.</div>`;
        });
});
