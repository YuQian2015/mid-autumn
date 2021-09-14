export default class MidAutumn {

    constructor(config = {}) {
        this.config = config;
    }

    result = [];
    awardList = [];

    // '000600' 六勃红
    // '600000' 遍地锦
    // '060000' '006000' '000060' '000006' 六勃黑
    // '111111' 对堂
    // '100500' '010500' '001500' '000510' '000501' 五红
    // '5xxxxx' 'x5xxxx' 'xx5xxx' 'xxxx5x' 'xxxxx5' 五子登科
    // '200400' 状元插金花
    // 'xxx4xx' 状元
    // '4xxxxx' 'x4xxxx' 'xx4xxx' 'xxxx4x' 'xxxxx4' 四进
    // 'xxx3xx' 三红
    // 'xxx2xx' 二举
    // 'xxx1xx' 一秀
    rule = [{
        reg: /000600/,
        name: '六勃红'
    }, {
        reg: /600000/,
        name: '遍地锦'
    }, {
        reg: /6/,
        name: '六勃黑'
    }, {
        reg: /111111/,
        name: '对堂'
    }, {
        reg: /^\d{3}5\d{2}$/,
        name: '五红'
    }, {
        reg: /5/,
        name: '五子登科'
    }, {
        reg: /200400/,
        name: '状元插金花'
    }, {
        reg: /^\d{3}4\d{2}$/,
        name: '状元'
    }, {
        reg: /4/,
        name: '四进'
    }, {
        reg: /^\d{3}3\d{2}$/,
        name: '三红'
    }, {
        reg: /^\d{3}2\d{2}$/,
        name: '二举'
    }, {
        reg: /\d{3}1\d{2}$/,
        name: '一秀'
    }]

    _change() {
        const { onChange } = this.config;
        typeof onChange === 'function' && onChange(this.result);
    }

    // 开始博饼
    start() {
        return this.getPoint();
    }

    // 获取随机的6个点数
    getPoint() {
        this.result.length = 0;
        for (let i = 0; i < 6; i++) {
            this.result.push(Math.floor(Math.random() * 6) + 1)
        }
        this._change();
        return this.result;
    }

    // 通过传入特定的6个色子设置结果的点数
    setResult(result) {
        if (!(result instanceof Array) || result.length !== 6) {
            throw new Error('设置的结果必须是一个数字数组，并且每个数字在1到6之间');
        }
        this.result = result;
        this._change();
        return this;
    }

    getResult() {
        return this.result;
    }

    // 统计结果，将不同的点数统计在对应的位置上
    // [1点, 2点, 3点, 4点, 5点, 6点]
    _countResult() {
        this.award = [0, 0, 0, 0, 0, 0];
        this.result.forEach(item => {
            this.award[item - 1]++;
        });
        return this;
    }

    // 判断结果是什么奖项
    getAward() {
        this._countResult();
        const awardString = this.award.join('');
        console.log(awardString);
        if (this.rule && this.rule.length) {
            for (let i = 0; i < this.rule.length; i++) {
                if (this.rule[i].reg.test(awardString)) {
                    return {
                        name: this.rule[i].name,
                    }
                }
            }
            return {
                name: '未中奖',
            }
        }
    }
}