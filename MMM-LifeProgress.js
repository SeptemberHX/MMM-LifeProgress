// import moment from "moment";

Module.register("MMM-LifeProgress", {
    // Module config defaults.
    defaults: {},

    // Define required scripts.
    getScripts: function () {
        return ["moment.js"]
    },

    // Define styles.
    getStyles: function () {
        return ["MMM-LifeProgress.css"]
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

        var m = moment();
        const dayPercent = (m.valueOf() - m.startOf('hour').valueOf()) * 100 / (60 * 60 * 1000)
        const weekPercent = (m.valueOf() - m.startOf('isoweek').valueOf()) * 100 / (7 * 24 * 60 * 60 * 1000)
        const monthPercent = (m.valueOf() - m.startOf('month').valueOf()) * 100 / (m.endOf('month').valueOf() - m.startOf('month').valueOf())
        const yearPercent = (m.valueOf() - m.startOf('year').valueOf()) * 100 / (m.endOf('year').valueOf() - m.startOf('year').valueOf())

        wrapper.appendChild(this.createProgressRow('今天：', 'day', 'bg-success', dayPercent.toFixed(1)))
        wrapper.appendChild(this.createProgressRow('本周：', 'week', 'bg-info', weekPercent.toFixed(1)))
        wrapper.appendChild(this.createProgressRow('本月：', 'month', 'bg-warning', monthPercent.toFixed(1)))
        wrapper.appendChild(this.createProgressRow('本年：', 'year', 'bg-danger', yearPercent.toFixed(1)))
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
        pDiv.innerHTML = `<div class="progress-bar progress-bar-striped progress-bar-animated progress-bar-${type} ${color}" role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100" style="width: ${value}%">${value}%</div>`
        progressDiv.appendChild(pDiv)
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
                head.prepend(link)
            }
        })
    },
})