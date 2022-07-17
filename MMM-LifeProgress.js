Module.register("MMM-LifeProgress", {
    // Module config defaults.
    defaults: {},

    // Define required scripts.
    getScripts: function () {
        return ["moment.js"]
    },

    // Define styles.
    getStyles: function () {
        return ["MMM-LifeProgress.css", "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"]
    },

    start: function() {
        this.loadCSS()
        var self = this
        setInterval(function() {
            self.updateDom()
        }, 1000)
    },

    // Override dom generator.
    getDom: function() {
        var wrapper = document.createElement("div")
        wrapper.classList.add('container', 'life-progress-container')
        wrapper.appendChild(this.createProgressRow('今天：', 'day', 'bg-success', 10))
        wrapper.appendChild(this.createProgressRow('本周：', 'day', 'bg-info', 20))
        wrapper.appendChild(this.createProgressRow('本月：', 'day', 'bg-warning', 30))
        wrapper.appendChild(this.createProgressRow('本年：', 'day', 'bg-danger', 40))
        return wrapper
    },

    createProgressRow: function (text, type, color, value) {
        var row = document.createElement("div")
        row.classList.add('row', 'align-items-center')

        var textDiv = document.createElement("div")
        textDiv.classList.add('col', 'col-sm-auto', 'life-progress-text')
        textDiv.textContent = text
        row.appendChild(textDiv)

        var progressDiv = document.createElement("div")
        progressDiv.classList.add('col')

        var pDiv = document.createElement("div")
        pDiv.classList.add('progress')
        progressDiv.innerHTML = `<div class="progress-bar progress-bar-striped progress-bar-animated progress-bar-${type} ${color}" role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100" style="width: ${value}%"></div>`
        row.appendChild(progressDiv)

        return row
    },

    loadCSS: function() {
        var css = [
            {
                id:'lifeProgress-bootstrap-css',
                href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
            }
        ]
        css.forEach(function(c) {
            if (!document.getElementById(c.id))
            {
                var head  = document.getElementsByTagName('head')[0]
                var link  = document.createElement('link')
                link.id   = c.id
                link.rel  = 'stylesheet'
                link.type = 'text/css'
                link.href = c.href
                link.media = 'all'
                head.appendChild(link)
            }
        })
    },
})