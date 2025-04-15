@extends('admin.layout.app')

@section('title')
    Users
@endsection

@section('content')
    <style>
        .btn-outline-synthwave {
            border: 1px solid #f6a5ff;
            color: #f6a5ff;
            background-color: transparent;
        }

        .btn-outline-synthwave:hover {
            background-color: #f6a5ff;
            color: #1e1e2f;
        }
        /* Custom pastel styling for the edit state */
        .pastel-edit-badge {
            background: linear-gradient(135deg, #ffcfdf, #f7d3e3); /* soft pastel pink/purple hues */
            color: #4a4a4a; /* a dark shade for good contrast on hover */
            border: none;
            padding: 0.5em 0.75em;
            border-radius: 0.5rem;
            transition: background 0.3s ease, color 0.3s ease;
        }

        /* Remove default link underline and inherit text color */
        .edit-link {
            color: inherit;
            text-decoration: none;
        }

        /* Hover effect for the edit link */
        .edit-link:hover,
        .pastel-edit-badge:hover {
            background: linear-gradient(135deg, #f7d3e3, #ffcfdf);
            color: #000; /* turn the icon to black on hover for clarity */
        }


    </style>
    <div class="row">
        @include('admin.layout.sidebar')
        <div class="col-md-9">
            <div class="row mt-2">
                <div class="col-md-12">
                    <div class="card-header bg-white d-flex justify-content-between align-items-center">
                        <h3 class="mt-2">Users ({{$users->count()}})</h3>
                    </div>
                    <hr>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Registered</th>
                                <th scope="col">Orders</th>
                                <th scope="col">Money Spent</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            @foreach($users as $key => $user)
                                <tr>
                                    <td>{{$key+=1}}</td>
                                    <td>
                                                {{$user->name}}
                                    </td>
                                    <td>
                                                {{$user->email}}
                                    </td>
                                    <td>
                                        {{ \Carbon\Carbon::parse($user->created_at)->diffForHumans() }}

                                    </td>
                                    <td>
                                        {{$user->orders->count()}}
                                    </td>
                                    <td>
                                        {{ number_format($user->total_spent, 2) }} TND
                                    </td>
                                    <td>
                                        <a href="#" onclick="deleteItem({{$user->id}})" class="btn btn-sm btn-outline-synthwave">
                                            <i class="fas fa-user-minus"></i>
                                        </a>
                                        <form id="{{$user->id}}" action="{{route('admin.users.delete',$user->id)}}" method="POST">
                                            @csrf
                                            @method('DELETE')
                                        </form>
                                    </td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
@endsection
