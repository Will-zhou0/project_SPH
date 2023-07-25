<template>
    <div>
        <h2>效果一：显示TODO列表时，已完成的TODO为绿色</h2>
        <!-- 父组件先将数据传给子组件 -->
        <List :todos="todos">
            <!-- 子组件决定不了结构与外观，将子组件的数组再次回传 -->
            <template slot-scope="todoX">
                <span :style="{ color: todoX.todo.isComplete ? 'green' : '' }">{{ todoX.todo.text }}</span>
            </template>
        </List>
        <hr>
        <h2>效果二：显示TODO列表时，带序号，已完成的TODO为红色</h2>
        <List :todos="todos">
            <!-- 子组件决定不了结构与外观，将子组件的数组再次回传 -->
            <template slot-scope="todoXX">
                <h1 :style="{ color: todoXX.todo.isComplete ? 'red' : '' }">{{ todoXX.todo.id }}--{{ todoXX.todo.text }}
                </h1>
            </template>
        </List>

    </div>
</template>

<script>
export default {
    data() {
        return {
            todos: [
                { id: 1, text: "AAA", isComplete: false },
                { id: 2, text: "BBB", isComplete: true },
                { id: 3, text: "CCC", isComplete: false },
                { id: 4, text: "DDD", isComplete: false },
            ]
        }
    },
    components: {
        List: () => import('./List.vue')
    }
}
</script>

<style></style>