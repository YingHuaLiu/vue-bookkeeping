<template>
  <div class="numberPad">
    <div class="NotesAndOutput">
      <div class="notes">
        <span class="notesTitle">备注:</span>
        <input class="notesInput" type="text" placeholder="点击写备注..." :value="notes"
               @input="onNotesChange($event.target.value)">
      </div>
      <span class="output">{{ output }}</span>
    </div>
    <div class="buttons">
      <van-button type="default" @click="inputContent">1</van-button>
      <van-button type="default" @click="inputContent">2</van-button>
      <van-button type="default" @click="inputContent">3</van-button>
      <van-button type="default" @click="inputContent">0</van-button>
      <van-button type="default" @click="inputContent">4</van-button>
      <van-button type="default" @click="inputContent">5</van-button>
      <van-button type="default" @click="inputContent">6</van-button>
      <van-button type="default" @click="remove">
        <Icon name="backspace" class="backspace"/>
      </van-button>
      <van-button type="default" @click="inputContent">7</van-button>
      <van-button type="default" @click="inputContent">8</van-button>
      <van-button type="default" @click="inputContent">9</van-button>
      <van-button type="default" @click="clear">清空</van-button>
      <yd-button class="date" type="hollow">
        <Icon name="rili"/>
        <yd-datetime v-model="date" type="date" start-date='1970-01-01' :end-date="endDate"></yd-datetime>
      </yd-button>
      <van-button type="default" @click="inputContent">.</van-button>
      <van-button type="default" @click="ok" class="finish">完成</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import dayjs from 'dayjs'

@Component
export default class NumberPad extends Vue {
  output = '0'
  date = dayjs(new Date()).format('YYYY-MM-DD')
  endDate = this.date
  notes = ''

  onNotesChange(notes: string) {
    this.notes = notes
  }

  remove() {
    if (this.output.length === 1) {
      this.output = '0'
    } else {
      this.output = this.output.slice(0, -1)
    }
  }

  clear() {
    this.output = '0'
  }

  ok() {
    const number = parseFloat(this.output)
    this.$emit('submit', this.notes, number, this.date)
    this.output = '0'
    this.notes = ''
  }

  inputContent(event: MouseEvent) {
    const button = (event.target as HTMLButtonElement)
    const input = button.textContent! //!意思是当前属性一定不为空，这样后面就不会报错了
    if (this.output.length === 11) {
      return
    }
    if (this.output === '0') {
      if ('0123456789'.indexOf(input) >= 0) {
        this.output = input
      } else {
        this.output += input
      }
      return
    }
    if (this.output.indexOf('.') >= 0 && input === '.') {
      return
    }
    this.output += input
  }
}
</script>

<style lang="scss" scoped>
.numberPad {
  background: #f6d169;
  padding: 4px 0 0 0;
  height: 40vh;

  .NotesAndOutput {
    font-size: 24px;
    font-family: Consolas, monospace;
    padding: 4px 4px;
    margin: 0 10px;
    background: white;
    border-radius: 8px;
    border: black 1px solid;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .notes {
      font-size: 14px;
      width: 55%;

      .notesTitle {
        font-weight: bold;
      }

      .notesInput {
        border: none
      }
    }
  }

  .buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 6px 4px;

    button {
      width: 22%;
      height: 6vh;
      margin: 4px 0;
      border: black 1px solid;
      font-size: 16px;
      font-weight: bold;
      border-radius: 8px;

      &.date {
        width: 47%;

        .icon {
          font-size: 22px;
        }

        .yd-datetime-input {
          display: inline;
        }
      }

      .backspace {
        font-size: 30px;
      }
    }

    .finish {
      background: #e88294;
      color: white;
    }
  }
}
</style>
