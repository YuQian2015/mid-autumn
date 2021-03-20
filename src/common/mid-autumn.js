export default class MidAutumn {

    constructor(config = {}) {
        this.config = config;
    }

    result = [];
    awardList = [];

    _change() {
        const { onChange } = this.config;
        typeof onChange === 'function' && onChange(this.result);
    }

    // 开始博饼
    start() {
        this.result.length = 0;
        this.getPoint();
        return this;
    }

    // 获取随机的6个点数
    getPoint() {
        for (let i = 0; i < 6; i++) {
            this.result.push(Math.floor(Math.random() * 6) + 1)
        }
        this._change();
    }

    // 设置结果的点数
    setResult(result) {
        if(!(result instanceof Array) || result.length !== 6) {
            throw new Error('设置的结果必须是一个数字数组，并且每个数字在1到6之间');
            return
        }
        this.result = result;
        this._change();
        return this;
    }

    // 统计结果
    _countResult() {
        this.award = [0,0,0,0,0,0];
        this.result.forEach( item => {
            this.award[item - 1] ++
        });
        console.log(this.award);
        return this;
    }


    // 判断结果是什么奖项
    getAward() {
        this._countResult();
        const award = this.award;
        if(award[3] === 4 && award[0] === 2) {
            return {
                name: '状元插金花',
                rank: 1,
                award: 'iPhone 一台'
            }
        }
    }

}