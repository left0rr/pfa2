@extends('admin.layout.app')

@section('title')
    Add New Product
@endsection

@section('content')
    <div class="row">
        @include('admin.layout.sidebar')
        <div class="col-md-9">
            <div class="row mt-2">
                <div class="col-md-12">
                    <hr class="card-header bg-white">
                    <h3 class="mt-2">Add a Product</h3>
                    <hr>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6 mx-auto">
                            <form action="{{ route('admin.products.store') }}" method="post" enctype="multipart/form-data">
                                @csrf
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control @error('name') is-invalid @enderror" id="floatingInput"
                                           name="name" placeholder="name of a color"
                                           value="{{ old('name') }}">
                                    <label for="floatingInput">Product name*</label>
                                    @error('name')
                                    <span class="invalid-feedback">
                                <strong>{{ $message }}</strong>
                            </span>
                                    @enderror
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="number" class="form-control @error('qty') is-invalid @enderror" id="floatingInput"
                                           name="qty" placeholder="Quantity"
                                           value="{{ old('qty') }}">
                                    <label for="floatingInput">Quantity*</label>
                                    @error('qty')
                                    <span class="invalid-feedback">
                                <strong>{{ $message }}</strong>
                            </span>
                                    @enderror
                                </div>
                                <div class="form-floating ">
                                    <input type="number" class="form-control @error('price') is-invalid @enderror" id="floatingInput"
                                           name="price" placeholder="Price"
                                           value="{{ old('price') }}">
                                    <label for="floatingInput">Price*</label>
                                    @error('price')
                                    <span class="invalid-feedback">
                                <strong>{{ $message }}</strong>
                            </span>
                                    @enderror
                                </div>
                                <div>
                                    <label for="color_id" class="my-2">Choose Colors*</label>
                                    <select name="color_id[]" id="color_id"
                                    class="form-control @error('color_id') is-invalid @enderror" multiple>
                                        @foreach($colors as $color)
                                            <option
                                                @if(collect(old('color_id'))->contains($color->id)) selected @endif value="{{$color->id}}">{{$color->name}}</option>
                                        @endforeach
                                    </select>
                                    @error('color_id')
                                    <span class="invalid-feedback">
                                <strong>{{ $message }}</strong>
                            </span>
                                    @enderror
                                </div>
                                <div>
                                    <label for="size_id" class="my-2">Choose Sizes*</label>
                                    <select name="size_id[]" id="size_id"
                                            class="form-control @error('size_id') is-invalid @enderror" multiple>
                                        @foreach($sizes as $size)
                                            <option
                                                @if(collect(old('size_id'))->contains($size->id)) selected @endif value="{{$size->id}}">{{$size->name}}</option>
                                        @endforeach
                                    </select>
                                    @error('size_id')
                                    <span class="invalid-feedback">
                                <strong>{{ $message }}</strong>
                            </span>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label class="my-2" for="floatingInput">Description*</label>
                                    <textarea rows="10" class="form-control summernote @error('description') is-invalid @enderror" id="floatingInput"
                                           name="description" placeholder="Describe the product"
                                    >{{old('description')}} </textarea>
                                    @error('description')
                                    <span class="invalid-feedback">
                                <strong>{{ $message }}</strong>
                            </span>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="thumbnail">Thumbnail*</label>
                                    <input type="file" class="form-control @error('thumbnail') is-invalid @enderror"
                                           name="thumbnail" id="thumbnail">
                                    @error('thumbnail')
                                    <span class="invalid-feedback">
                                <strong>{{ $message }}</strong>
                            </span>
                                    @enderror
                                </div>
                                <div class="mt-2">
                                    <img src="#" id="thumbnail-preview"
                                         class="d-none img-fluid rounded mb-2"
                                         width="100"
                                         height="100" alt="">

                                </div>
                                <div class="mb-3">
                                    <label for="first_image">First Image*</label>
                                    <input type="file" class="form-control @error('first_image') is-invalid @enderror"
                                           name="first_image" id="first_image">
                                    @error('first_image')
                                    <span class="invalid-feedback">
                                <strong>{{ $message }}</strong>
                            </span>
                                    @enderror
                                </div>
                                <div class="mt-2">
                                    <img src="#" id="first_image-preview"
                                         class="d-none img-fluid rounded mb-2"
                                         width="100"
                                         height="100" alt="">
                                </div>
                                <div class="mb-3">
                                    <label for="second_image">Second Image*</label>
                                    <input type="file" class="form-control @error('second_image') is-invalid @enderror"
                                           name="second_image" id="second_image">
                                    @error('second_image')
                                    <span class="invalid-feedback">
                                <strong>{{ $message }}</strong>
                            </span>
                                    @enderror
                                </div>
                                <div class="mt-2">
                                    <img src="#" id="second_image-preview"
                                         class="d-none img-fluid rounded mb-2"
                                         width="100"
                                         height="100" alt="">
                                </div>
                                <div class="mb-3">
                                    <label for="third_image">Third Image*</label>
                                    <input type="file" class="form-control @error('third_image') is-invalid @enderror"
                                           name="third_image" id="third_image">
                                    @error('third_image')
                                    <span class="invalid-feedback">
                                <strong>{{ $message }}</strong>
                            </span>
                                    @enderror
                                </div>
                                <div class="mt-2">
                                    <img src="#" id="third_image-preview"
                                         class="d-none img-fluid rounded mb-2"
                                         width="100"
                                         height="100" alt="">
                                </div>
                                <div class="mb-2">
                                    <button type="submit" class="btn btn-sm btn-dark">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



@endsection
