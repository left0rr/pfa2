<?php

use App\Http\Controllers\Api\CouponController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Route::get('/user', function (Request $request) {
   // return $request->user();
//})->middleware('auth:sanctum');
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('user', function (Request $request) {
        return [
            'user'=>UserResource::make($request->user()),
            'access_token'=>$request->bearerToken()
        ];
    });
    Route::post('user/logout', [UserController::class,'logout']);
    Route::put('user/profile/update', [UserController::class,'UpdateUserProfile']);
    //coupon route
    Route::post('apply/coupon', [CouponController::class,'apply']);
    //orders routes
    Route::post('store/order', [OrderController::class,'store']);
    Route::post('pay/order', [OrderController::class,'payOrderWithStripe']);


});


//products routes
Route::get('products', [ProductController::class,'index']);
Route::get('products/{color}/color', [ProductController::class,'filterProductsByColor']);
Route::get('products/{size}/size', [ProductController::class,'filterProductsBySize']);
Route::get('products/{searchTerm}/find', [ProductController::class,'findProductsByTerm']);
Route::get('product/{product}/show', [ProductController::class,'show']);
//user routes
Route::post('user/register', [UserController::class,'store']);
Route::post('user/login', [UserController::class,'auth']);




