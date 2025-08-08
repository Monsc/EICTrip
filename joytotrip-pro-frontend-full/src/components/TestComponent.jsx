import React from 'react'

function TestComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          🎉 Tailwind CSS 工作正常！
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          如果你能看到这个漂亮的卡片，说明 Tailwind CSS 已经成功加载并工作。
        </p>
        <div className="space-y-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800">✅ 成功加载</h3>
            <p className="text-blue-600 text-sm">Tailwind CSS 样式已生效</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800">🎨 样式正常</h3>
            <p className="text-green-600 text-sm">颜色、字体、间距都正常</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800">🚀 准备就绪</h3>
            <p className="text-purple-600 text-sm">可以开始开发 EICTrip 了</p>
          </div>
        </div>
        <button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
          继续开发
        </button>
      </div>
    </div>
  )
}

export default TestComponent 